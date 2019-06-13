import {BASE_URL} from '../config';

export function getItem(survey_id) {
    fetch(
        BASE_URL + "api/getquiz",
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id : survey_id,
                password:this.state.password
            })
        }
    )
    .then(response => response.json())
    .then(responseJson => {
        RNProgressHud.dismiss();
        if (responseJson.success == "success") {
            
            this.props.setUser({
                userId: responseJson.user.id,
                userName: responseJson.user.userName,
                email : responseJson.user.email,
                photo : responseJson.user.photo,
                //apiToken: responseJson.apiToken,

            });
            this.setState({
                email:"",
                password:""
            })
            this.props.navigation.navigate('Main');
        } else {
            alert("Email or Password is not correct");
        }
    })
    .catch( error => {
        RNProgressHud.dismiss();
        alert("Network error...");
        return;            
    })
}