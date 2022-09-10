//get start points/end points (in string) from user



//convert the start points and end points strings to JSON 

// Pedestrian is SELECTED at first (by default) ****

// <input type="radio" name="gender" id="gender_Male" value="Male" />
// <input type="radio" name="gender" id="gender_Female" value="Female" />

function showValues() 
    {
        //console gets cleared on every submissions
        let start_p = document.getElementById('start_p').value;
        let end_p = document.getElementById('end_p').value;
        let walk = false;
        let bike = false;
        let drive = false;
        let disabled = false;

        if(document.getElementById('walk').checked) {
            walk = true;
        }else if(document.getElementById('bike').checked) {
            bike = true;
        }else if(document.getElementById('drive').checked) {
            drive = true;
        }else if(document.getElementById('disabled').checked) {
            disabled = true;
        }
        let myJSON = {start: start_p, end_p: end_p, walking: walk, biking: bike, driving: drive, disability: disabled}
        alert(myJSON);
        return myJSON;
    }




