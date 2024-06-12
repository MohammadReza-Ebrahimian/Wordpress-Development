<?php


function universityRegisterSearch () {
    register_rest_route( 'university/v1', 'search', array(
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'universitySearchResults'
    ));
}

function universitySearchResults () {
    return 'New API route';
}

add_action('rest_api_init','universityRegisterSearch');



?>