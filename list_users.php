<!-- 
  -- list_users.php - useradmin-lamp
  -- contains code to do the actual listing, by pulling data from the database
  -- 
  -- Aziz | 15 Sep 2015
  -->


<table class="table_list" cellspacing="2" cellpadding="0">
    <tr class="bg_h">
        <th>Full name</th>
        <th>Email</th>
        <th>Age</th>
        <th>Options</th>
    </tr>
    <?php
	// display the list of all users in table view
        $sql = "SELECT * FROM users ORDER BY id ASC";
        $query = $pdo->prepare($sql);
        $query->execute();
        $list = $query->fetchAll();
        $bg = 'bg_1';
        foreach ($list as $rs) 
        {
    ?>
            <tr class="<?php echo $bg; ?>">
                <td><?php echo $rs['full_name']; ?></td>
                <td><?php echo $rs['email']; ?></td>
                <td><?php echo $rs['age']; ?></td>
                <td><a href="#" class="delete_m" onclick="delete_user(<?php echo $rs['id']; ?>)"><img src="img/delete.png"> Delete</a></td>
            </tr>
    <?php
            if ($bg == 'bg_1') 
            {
                $bg = 'bg_2';
            } 
            else 
            {
                $bg = 'bg_1';
            }
        }
    ?>
</table>