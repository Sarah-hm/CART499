<?php
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
// echo($_POST['aMRI-prompt']);
// need to process
 $aMRIprompt = $_POST['aMRIprompt'];
 $polygonsAlphas = $_POST['polygonsAlphas'];
 $pathsAlphas = $_POST['pathsAlphas'];
 //run if there is a files array

   //package the data and echo back
    /* make  a new php object*/
    $myPackagedData=new stdClass();
    $myPackagedData->aMRIprompt = $aMRIprompt ;
    $myPackagedData->polygonsAlphas = $polygonsAlphas ;
    $myPackagedData->pathsAlphas = $pathsAlphas ;

     /* Now we want to JSON encode these values as a JSON string ..
     to send them to $.ajax success  call back function... */
    $myJSONObj = json_encode($myPackagedData); //if it's not encoded in JSON, javascript won't be able to read it (doesnt read php)
    // echo $myJSONObj;

    $theFile = fopen("data/aMRI-data.txt", "a") or die("Unable to open file!");

    fwrite($theFile, $myJSONObj);
    //write a new line after!
    fwrite($theFile,"\n");
    fclose($theFile);
    // echo $myJSONObj;
    exit;
}//POST
?>