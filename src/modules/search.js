import $ from "jquery";

class Search {
  constructor() {
    document.addEventListener("DOMContentLoaded", () => {
      this.addSearchHTML();
      this.resultsDiv = $("#search-overlay__results");
      this.openButton = $(".js-search-trigger");
      this.closeButton = $(".search-overlay__close");
      this.searchOverlay = $(".search-overlay");
      this.searchField = $("#search-term");
      this.events();
      this.isOverlayOpen = false;
      this.isSpinnerVisible = false;
      this.previousValue = "";
      this.typingTimer;
    });
  }

  events() {
    this.openButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeOverlay.bind(this));
    $(document).on("keydown", this.keyPressDispatcher.bind(this));
    this.searchField.on("keyup", this.typingLogic.bind(this));
  }

  typingLogic() {
    if (this.searchField.val() != this.previousValue) {
      clearTimeout(this.typingTimer);

      if (this.searchField.val()) {
        if (!this.isSpinnerVisible) {
          this.resultsDiv.html('<div class="spinner-loader"></div>');
          this.isSpinnerVisible = true;
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 750);
      } else {
        this.resultsDiv.html("");
        this.isSpinnerVisible = false;
      }
    }

    this.previousValue = this.searchField.val();
  }

  getResults() {
    $.when(
      $.getJSON(
        universitydata.root_url +
          "/wp-json/wp/v2/posts?search=" +
          this.searchField.val()
      ),
      $.getJSON(
        universitydata.root_url +
          "/wp-json/wp/v2/pages?search=" +
          this.searchField.val()
      ),
      $.getJSON(
        universitydata.root_url +
          "/wp-json/wp/v2/program?search=" +
          this.searchField.val()
      )
    ).then(
      (posts, pages, programs) => {
        var combinedresult = posts[0].concat(pages[0]).concat(programs[0]);
        this.resultsDiv.html(`
                <h2 class="search-overlay__section-title">General Information</h2>
                ${
                  posts.length
                    ? '<ul class="link-list min-list">'
                    : "<p>No general information matches that search.</p>"
                }
                  ${combinedresult
                    .map(
                      (item) =>
                        `<li><a href="${item.link}">${item.title.rendered}</a>${
                          item.type == "post" ? ` by ${item.authorName}` : ""
                        }</li>`
                    )
                    .join("")}
                ${combinedresult.length ? "</ul>" : ""}
              `);
        this.isSpinnerVisible = false;
      },
      () => {
        this.resultsDiv.html("<p>Unexpected error; please try again.</p>");
      }
    );
  }

  keyPressDispatcher(e) {
    if (
      e.keyCode == 83 &&
      !this.isOverlayOpen &&
      !$("input, textarea").is(":focus")
    ) {
      this.openOverlay();
    }

    if (e.keyCode == 27 && this.isOverlayOpen) {
      this.closeOverlay();
    }
  }

  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active");
    $("body").addClass("body-no-scroll");
    this.searchField.val("");
    setTimeout(() => this.searchField.focus(), 301);
    console.log("Overlay opened!");
    this.isOverlayOpen = true;
  }

  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
    console.log("Overlay closed!");
    this.isOverlayOpen = false;
  }

  addSearchHTML() {
    $("body").append(`
      <div class="search-overlay">
        <div class="search-overlay__top">
          <div class="container">
            <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
            <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term">
            <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
          </div>
        </div>
        <div class="container">
          <div id="search-overlay__results"></div>
        </div>
      </div>
    `);
    console.log("Search HTML added to DOM");
  }
}

export default Search;

// Ensure the class is instantiated after the document is ready
document.addEventListener("DOMContentLoaded", () => {
  new Search();
});
