<?php
//    include('../includes/config.php');

    include('../config.php');
    $pdo = connect();
    
    // display the list of all users in table view
    $sql = "SELECT * FROM users ORDER BY id ASC";
    $query = $pdo->prepare($sql);
    $query->execute();
    $list = $query->fetchAll();

    # JSON-encode the response
    $json_response = json_encode($list);

    // # Return the response
    echo $json_response;