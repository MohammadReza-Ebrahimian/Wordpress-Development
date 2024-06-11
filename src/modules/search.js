import $ from 'jquery';


class Search {
    // 1. describe and create/intiate our object
    constructor (){
        this.resultDiv = $('search-overlay__result');
        this.openButton = $('.js-search-trigger');
        this.closeButton = $('.search-overlay__close');
        this.searchOverlay = $('.search-overlay');
        this.searchField = $('#search-term');
        this.events();
        this.isOverlayOpen = false;
        this.isSpinnerVisible = false;
        this.prevousvalue;
        this.typingTimer;
    }

    // 2. events
    events() { 
        this.openButton.on('click',this.openOverlay.bind(this));
        this.closeButton.on('click',this.closeOverlay.bind(this));
        $(document).on('keydown',this.keyPressDispatcher.bind(this));
        this.searchField.on('keyup',this.typingLogic.bind(this));
        }

    // 3. methods(function,action..)

    typingLogic () {
        if(this.searchField.val() != this.prevousvalue) {
            clearTimeout(this.typingTimer);
    
            if(!this.isSpinnerVisible){
                this.resultDiv.html('<div class="spinner-loader"></div>');
                this.isSpinnerVisible=true;
            };
            this.typingTimer = setTimeout(this.getResult.bind(this),2000);
        }
        this.prevousvalue = this.searchField.val();
    }



    getResult(){
        this.resultDiv.html('kunnnnn');
        this.isSpinnerVisible=false;
    }  




    keyPressDispatcher(e) {
        if (e.keyCode == 83 && !this.isOverlayOpen) {
          this.openOverlay();
        }

        if(e.keyCode == 27 && this.isOverlayOpen) {
            this.closeOverlay();

        }
    }

    openOverlay(){
        this.searchOverlay.addClass('search-overlay--active');
        $('body').addClass('body-no-scroll');
        this.isOverlayOpen = true;
    }


    closeOverlay(){
        this.searchOverlay.removeClass('search-overlay--active');
        $('body').removeClass('body-no-scroll');
        this.isOverlayOpen = false;
    }



}



export default Search;