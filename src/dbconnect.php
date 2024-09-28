<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$postData = file_get_contents("php://input");
$request = json_decode($postData, true);

$first_name = $request['first_name'] ?? '';
$last_name = $request['last_name'] ?? '';

$servername = "localhost";
$username = "arbert";
$password = "Waybo5668@2004";
$dbname = "clacg";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array("error" => "Connection failed: " . $conn->connect_error)));
}

// Step 1: Get the volunteer_id based on the first and last name
$volunteerSql = $conn->prepare("SELECT Volunteer_ID FROM volunteer_defn WHERE Volunteer_FirstName = ? AND Volunteer_LastName = ?");
$volunteerSql->bind_param("ss", $first_name, $last_name);
$volunteerSql->execute();
$volunteerResult = $volunteerSql->get_result();

if ($volunteerResult->num_rows > 0) {
    $volunteer = $volunteerResult->fetch_assoc();
    $volunteer_id = $volunteer['Volunteer_ID'];
    
    // Step 2: Get all event_ids the volunteer attended
    $eventsSql = $conn->prepare("SELECT Event_ID FROM volunteer_activity WHERE Volunteer_ID = ?");
    $eventsSql->bind_param("s", $volunteer_id);
    $eventsSql->execute();
    $eventsResult = $eventsSql->get_result();
    
    $eventDetails = [];
    
    if ($eventsResult->num_rows > 0) {
        // Step 3: For each event_id, get event details and hours worked
        while ($eventRow = $eventsResult->fetch_assoc()) {
            $event_id = $eventRow['Event_ID'];
            
            $eventInfoSql = $conn->prepare("SELECT Event_Name, Event_Desc, Event_Date, Event_Location, Event_Hours, Event_Accomplishment FROM event_defn WHERE Event_ID = ?");
            $eventInfoSql->bind_param("s", $event_id);
            $eventInfoSql->execute();
            $eventInfoResult = $eventInfoSql->get_result();
            
            if ($eventInfoResult->num_rows > 0) {
                while ($eventInfo = $eventInfoResult->fetch_assoc()) {
                    $eventDetails[] = $eventInfo;
                }
            }
        }
    }
    
    echo json_encode($eventDetails);
} else {
    echo json_encode(array("message" => "No volunteer found with that name."));
}

$conn->close();
?>
