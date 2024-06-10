<?php

get_header(); 
pageBanner(array(
  'title'=>'Past Events',
  'subtitle'=>'A recap of our past events.'
));

?>

  <div class="container container--narrow page-section">
  <?php


//Load Custom Query

$today = date('Ymd');
$pastEvents = new WP_Query(array(
  'post_type'=>'event',
  'meta_key'=>'event_date',
  'orderby'=>'meta_value_num',
  'order'=>'ASC',
  'paged'=> get_query_var('paged',1),
  'meta_query'=> array(
    array(
      'key'=>'event_date',
      'compare'=>'<',
      'value'=>$today,
      'type'=>'numeric'
    )
  )
));




  while ($pastEvents->have_posts()) {
    $pastEvents->the_post();

    // calling template
    get_template_part('template-parts/content-event');
  }

  //  Pagination

  echo paginate_links(array(
    'total'=>$pastEvents->max_num_pages,
  ));

  //  End of Pagination

  ?>

  </div>


<?php
get_footer();

?>