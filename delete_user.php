<?php

/* 
 *  delete_user.php - useradmin-lamp
 *  will be used by ajax to delete an existing user
 *  
 *  Aziz | 15 Sep 2015
 */


include('config.php');
$pdo = connect();

// deleting a user using PDO with try/catch to escape the exceptions
try 
{
    $sql = "DELETE FROM users WHERE id = :id";
    $query = $pdo->prepare($sql);
    $query->bindParam(':id', $_POST['id'], PDO::PARAM_INT);
    $query->execute();
} 
catch (PDOException $e) 
{
    echo 'PDOException : '.  $e->getMessage();
}
 
// list_users : this file displays the list of users in a table view
include('list_users.php');
