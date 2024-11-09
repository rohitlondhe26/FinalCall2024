var SharedPreferences = require('react-native-shared-preferences');
import axios from "axios";

const BASEURL = "http://onusapi.onus-tech.in/api/"


export const login = async (username, password) => {
    return await axios.post(`${BASEURL}Account/Login`, null, {
        params: {
            UserName: username,
            Password: password
        }
    })
}

export const changepassword = async (username, oldpassword, newpassword) => {
    // console.log("CHANGE PASSWORD")
    return await axios.post(`${BASEURL}Account/ChangePassword`, null, {
        params: {
            UserName: username,
            CurrentPassword: oldpassword,
            NewPassword: newpassword
        }
    })
}

export const register = async (registrationInfo) => {

    // console.log(`${BASEURL}Padadhikari/Registration`)
    console.log({
        "id": 0,
        ...registrationInfo,
        "createdon": "2024-09-16T13:30:24.041Z",
        "updatedon": "2024-09-16T13:30:24.041Z"
    })

    return await axios.post(`${BASEURL}Padadhikari/Registration`,
        {
            "id": 0,
            ...registrationInfo,
            "createdon": "2024-09-16T13:30:24.041Z",
            "updatedon": "2024-09-16T13:30:24.041Z"
        }
    )
}

export const updateVoter = async (voterInfo) => {

    console.log(`${BASEURL}Padadhikari/Registration`)

    let token = await getToken();
    const config = {
        params: { ...voterInfo },
        headers: {

            'Authorization': `Bearer ${token}`
        }
    };
    console.log(config)
    return await axios.post(`${BASEURL}Voter/VoterinformationforUpdate`, null,
        config
    )
}


export const logout = async (userid) => {
    return await axios.post(`${BASEURL}Account/Logout`, null, {
        params: {
            userid
        }
    })
}

/** Voter Data */

export const CATEGORY = {
    FIRSTNAMESUMMARY: "FM_NAME_EN_META",
    FIRSTNAMELIST: "FM_NAME_EN",
    FULLNAMELIST: "FULL_NAME_EN",
    LASTNAMESUMMARY: "LASTNAME_EN_META",
    LASTNAMELIST: "LASTNAME_EN",
    GENDERWISELIST: "GENDERWISELIST",
    MOBILENUMBERWISELIST: "MOBILE_NO",
    EPICNOWISELIST: "EPIC_NO",
    AGEWISEINFORMATIONSUMMARY: "AGEWISEINFORMATIONSUMMARY",
    AGEWISEINFORMATIONLIST: "AGEWISEINFORMATIONLIST",
    PINCODESUMMARY: "PINCODESUMMARY",
    PINCODELIST: "PINCODELIST",
    EDUCATIONLIST: "EDUCATIONLIST",
    OCCUPATIONLIST: "OCCUPATIONLIST",
    MOTHERTONGUELIST: 'MOTHERTONGUELIST',
    VIDHANSABHALIST: 'VIDHANSABHALIST',
    LANGUAGESUMMARY: "LANGUAGESUMMARY",
    LANGUAGELIST: "LANGUAGELIST",
    AREALIST: "AREALIST",
    TITLELIST: 'TITLELIST',
    MULTIPLESEARCHLIST: 'MULTIPLESEARCHLIST',
    VOTERTYPE: 'VOTERTYPE'
}

const getToken = async (key = "AuthKey") => {
    let token = await new Promise((resolve) => SharedPreferences.getItem(key, (value) => resolve(value)));
    return token;
}



// Function to set the Authorization token
// export const setAuthToken = (token) => {
//     if (token) {
//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     } else {
//         delete axiosInstance.defaults.headers.common['Authorization'];
//     }
// };

// export default axiosInstance;

export const getCategory = async (category, input, offset = 0) => {
    // const instance = await axiosInstance();
    input = input || "%";
    let url = "";
    let params = {
        sortorder: 'asc',
        offset,
        pagesize: 100
    };
    switch (category) {

        case 'FM_NAME_EN_META':
            url = `${BASEURL}Voter/GetFirstNameSummary`
            break;
        case 'FM_NAME_EN':
            url = `${BASEURL}Voter/GetListByFirstName`
            params = {
                firstname: `${input}`,
                ...params
            }
            break;

        case 'FULL_NAME_EN':
            url = `${BASEURL}Voter/GetListByFullName`
            params = {
                name: `${input === "%" ? "% %" : input}`,
                ...params
            }
            break;

        case 'AGEWISEINFORMATIONSUMMARY':
            url = `${BASEURL}Voter/GetAgewiseSummary`
            break;
        case 'AGEWISEINFORMATIONLIST':
            url = `${BASEURL}Voter/GetAgewiseinformation`
            params = {
                agesection: `${input}`,
                ...params
            }
            break;

        case 'PINCODESUMMARY':
            url = `${BASEURL}Voter/GetPinCodeSummary`
            break;
        case 'PINCODELIST':
            url = `${BASEURL}Voter/GetListByPincode`
            params = {
                pincode: `${input}`,
                ...params
            }
            break;

        case 'LANGUAGESUMMARY':
            url = `${BASEURL}Voter/GetLanguageSummary`
            break;
        case 'LANGUAGELIST':
            url = `${BASEURL}Voter/GetListByLanguage`
            params = {
                language: `${input}`,
                ...params
            }
            break;

        case 'LASTNAME_EN_META':
            url = `${BASEURL}Voter/GetlastNameSummary`
            break;
        case 'LASTNAME_EN':
            url = `${BASEURL}Voter/GetListByLastName`
            params = {
                lasttname: `${input}`,
                ...params
            }
            break;
        case 'GENDERWISELIST':
            url = `${BASEURL}Voter/GetListByGenderwise`
            params = {
                gender: `${input}`,
                ...params
            }
            break;

        case 'MOBILE_NO':
            url = `${BASEURL}Voter/GetListMobilewise`
            params = {
                mobileno: `${input}`,
                ...params
            }
            break;

        case 'EPIC_NO':
            url = `${BASEURL}Voter/GetListEPICnowise`
            params = {
                epicno: `${input}`,
                ...params
            }
            break;

        case 'AREALIST':
            url = `${BASEURL}Voter/GetListByArea`
            params = {
                area: `${input}`,
                ...params
            }
            break;

        case 'MULTIPLESEARCHLIST':
            url = `${BASEURL}Voter/GetMultipleSearch`
            params = {
                ...input,
                ...params
            }
            break;


        case 'VOTERTYPE':
            url = `${BASEURL}Voter/GetVotertypeList`
            let userName = await getToken("userName");
            let additionalparams = {
                username: userName,
            };
            params = {
                votertype: input,
                ...params,
                ...additionalparams
            }
            break;
        default:
            break;
    }

    if (url) {
        let token = await getToken();
        console.log("URL", url, params, token);
        const config = {
            params: params,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        // axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
        try {

            return axios.get(url, config);
        } catch (error) {
            console.log(error)
        }
    }
    else
        return null

}

export const getList = async (category) => {
    let url = "";

    switch (category) {

        case 'EDUCATIONLIST':
            url = `${BASEURL}Padadhikari/GetListEducationwise`
            break;
        case 'OCCUPATIONLIST':
            url = `${BASEURL}Padadhikari/GetListOccupationwise`
            break;
        case 'MOTHERTONGUELIST':
            url = `${BASEURL}Padadhikari/GetListmothertonguewise`
            break;
        case 'VIDHANSABHALIST':
            url = `${BASEURL}Padadhikari/GetListVidhansabhawise`
            break;
        case 'TITLELIST':
            url = `${BASEURL}Padadhikari/GetListTitlewise`
            break;


        default:
            break;
    }

    if (url) {
        console.log("URL", url);
        return await axios.get(url);
    }
    else
        return null
}

export const getSurveyList = async (epic_no) => {
    let url = `${BASEURL}Voter/GetFeedbackInformation`;
    let params = {
        epic_no
    };
    if (url) {
        let token = await getToken();
        let userName = await getToken("userName");

        const config = {
            headers: {
                params: { ...params, userName },
                'Authorization': `Bearer ${token}`
            }
        };
        console.log("URL", url, config);
        try {
            return axios.get(url, config);
        } catch (error) {
            console.log(error)
            return error
        }
    }
    else
        return null

}

export const submitAnswer = async (input) => {
    let url = "";
    let params = {
        ...input
    };
    if (url) {
        let token = await getToken();
        console.log("URL", url, params, token);
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            return axios.post(url, config, params);
        } catch (error) {
            console.log(error)
            return error
        }
    }
    else
        return null

}

export const submitFCMToken = async () => {
    let url = `${BASEURL}User/UpdateNotificationToken`;


    if (url) {
        let token = await getToken();
        let userName = await getToken("userName");
        let fcm = await getToken("fcm");

        let params = {
            userCode: userName,
            notificationToken: fcm
        };

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        console.log("URL", url, config);
        try {
            return axios.post(url, params, config);
        } catch (error) {
            console.log(error)
            return error
        }
    }
    else
        return null
}

export const getUpdateVoter = async (epic_no) => {

    let url = `${BASEURL}Voter/GetVoterinformationforUpdate`;


    if (url) {
        let token = await getToken();

        let params = {
            epicno: epic_no
        };

        const config = {
            params,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        console.log("URL", url, config);
        try {
            return axios.get(url, config);
        } catch (error) {
            console.log(error)
            return error
        }
    }
    else
        return null
}

export const getNotification = async () => {
    let url = `${BASEURL}Common/GetNotification`;


    if (url) {
        let token = await getToken();
        let userName = await getToken("userName");
        let params = {
            userCode: userName,
        };

        const config = {
            params,
            // headers: {
            //     'Authorization': `Bearer ${token}`
            // }
        };
        console.log("URL", url, config);
        try {
            return axios.get(url, config);
        } catch (error) {
            console.log(error)
            return error
        }
    }
    else
        return null
}

export const getSuchanaByUser = async () => {
    let url = `${BASEURL}Common/GetSuchanaByUser`;


    if (url) {
        let token = await getToken();
        let userName = await getToken("userName");
        let params = {
            userCode: userName,
        };

        const config = {
            params,
            // headers: {
            //     'Authorization': `Bearer ${token}`
            // }
        };
        console.log("URL", url, config);
        try {
            return axios.get(url, config);
        } catch (error) {
            console.log(error)
            return error
        }
    }
    else
        return null
}

export const getVotingInfoByUser = async () => {
    let url = `${BASEURL}Common/GetVotingInformationByUser`;


    if (url) {
        let token = await getToken();
        let userName = await getToken("userName");
        let params = {
            userCode: userName,
        };

        const config = {
            params,
            // headers: {
            //     'Authorization': `Bearer ${token}`
            // }
        };
        console.log("URL", url, config);
        try {
            return axios.get(url, config);
        } catch (error) {
            console.log(error)
            return error
        }
    }
    else
        return null
}


export const submitVotingInfo = async (votingcount, remark) => {
    let url = `${BASEURL}Common/AddVotingInformationByUser`;


    if (url) {
        let token = await getToken();
        let userName = await getToken("userName");

        let params = {
            usercode: userName,
            votingcount: votingcount,
            remark: remark
        };

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: params
        };
        console.log("URL", url, config);
        try {
            return axios.post(url, null, config);
        } catch (error) {
            console.log(error)
            return error
        }
    }
    else
        return null
}

export const submitSuchnaInfo = async (suchana) => {
    let url = `${BASEURL}Common/AddSuchanaByUser`;


    if (url) {
        let token = await getToken();
        let userName = await getToken("userName");

        let params = {
            usercode: userName,
            suchana: suchana
        };

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: params
        };
        console.log("URL", url, config);
        try {
            return axios.post(url, null, config);
        } catch (error) {
            console.log(error)
            return error
        }
    }
    else
        return null
}

export const getDashboardData = async () => {
    let url = `${BASEURL}Voter/GetGenderSummary`;
    if (url) {
        let token = await getToken();
        let userName = await getToken("userName");

        const config = {
            headers: {
                params: { userName },
                'Authorization': `Bearer ${token}`
            }
        };
        console.log("URL", url, config);
        try {
            return axios.get(url, config);
        } catch (error) {
            console.log(error)
            return error
        }
    }
    else
        return null

}
