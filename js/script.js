/* 
 *  script.js - useradmin-lamp
 *  contains ajax method to facilitate request and response
 *  
 *  
 *  Aziz | 15 Sep 2015
 */


// ajax : basic function for using ajax easily
function ajax (url, method, params, container_id, loading_text) 
{
    try 
    { 
        // For: chrome, firefox, safari, opera, yandex, ...
    	xhr = new XMLHttpRequest();
    } 
    catch(e) 
    {
        try
        { 
            // for: IE6+
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } 
        catch(e1) 
        { 
            // if not supported or disabled
            alert("Not supported!");
        }
    }
    
    xhr.onreadystatechange = function() 
    {
        // Holds the status of the XMLHttpRequest. Changes from 0 to 4: 
        // 0: request not initialized 
        // 1: server connection established
        // 2: request received 
        // 3: processing request 
        // 4: request finished and response is ready
        // 
        // ref: http://www.w3schools.com/ajax/ajax_xmlhttprequest_onreadystatechange.asp
        if(xhr.readyState === 4) 
        { 
            // when result is ready
            document.getElementById(container_id).innerHTML = xhr.responseText;
        } 
        else 
        { 
            // waiting for result 
            document.getElementById(container_id).innerHTML = loading_text;
        }
    };
    
    // send reuquest using ajax
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(params);
}


// add_user function
function add_user() 
{
    // initialisation
    var url = 'add_user.php';
    var method = 'POST';
    var params = 'full_name=' + document.getElementById('full_name').value;
    params += '&email=' + document.getElementById('email').value;
    params += '&age=' + document.getElementById('age').value;
    var container_id = 'list_container' ;
    var loading_text = '<img src="img/ajax_loader.gif">' ;

    // call ajax function
    ajax(url, method, params, container_id, loading_text) ;
}
 
 
// delete_user function
function delete_user(id) 
{
    if (confirm('Are you sure to delete this user ?')) 
    {
        // initialisation
        var url = 'delete_user.php';
        var method = 'POST';
        var params = 'id=' + id;
        var container_id = 'list_container' ;
        var loading_text = '<img src="img/ajax_loader.gif">' ;

        // call ajax function
        ajax(url, method, params, container_id, loading_text) ;
    }
}
 
