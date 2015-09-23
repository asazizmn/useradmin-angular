<?php

/* 
 *  add_user.php - useradmin-lamp
 *  will be used by ajax to add a new user
 *  
 *  Aziz | 15 Sep 2015
 */


include('config.php');
$pdo = connect();

// adding new user using PDO with try/catch to escape the exceptions
try 
{
    $sql = "INSERT INTO users (full_name, email, age) VALUES (:full_name, :email, :age)";
    $query = $pdo->prepare($sql);
    $query->bindParam(':full_name', $_POST['full_name'], PDO::PARAM_STR);
    $query->bindParam(':email', $_POST['email'], PDO::PARAM_STR);
    $query->bindParam(':age', $_POST['age'], PDO::PARAM_STR);
    $query->execute();
} 
catch (PDOException $e) 
{
    echo 'PDOException : '.  $e->getMessage();
}
 
// list_users : this file displays the list of users in a table view
include('list_users.php');

