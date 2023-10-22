const darkModeToggle = document.getElementById("dark-mode");

const searchBtn = document.getElementById("btn-search");

const profilePhoto = document.getElementById("profile-photo");

const profileName = document.getElementById("profile-name");

const profileCreatedTime = document.getElementById("profile-created-time");

const profileHandle = document.getElementById("profile-handle");

const profileBio = document.getElementById("profile-bio");

const repoCount = document.getElementById("repo-count");

const followerCount = document.getElementById("follower-count");

const followingCount = document.getElementById("following-count");

const place = document.getElementById("place");

const twitterHandle = document.getElementById("twitter-handle");

const website = document.getElementById("website");

const userCompany = document.getElementById("company");

const searchInput = document.getElementById("text");

const warning = document.getElementById("warning");

const results = document.getElementById("results")

const api = "https://api.github.com/users/";

const months = ["Jan", "Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

darkModeToggle.addEventListener("click", (e) => {
    console.log(darkModeToggle.childNodes)
    document.documentElement.classList.toggle("dark");
    
    if(darkModeToggle.childNodes[1].innerText !== "LIGHT"){
        darkModeToggle.childNodes[1].innerText = "LIGHT";
        darkModeToggle.childNodes[5].classList.remove("hidden");
        darkModeToggle.childNodes[3].classList.add("hidden");

    } else{
        darkModeToggle.childNodes[1].innerText = "DARK"
        darkModeToggle.childNodes[5].classList.add("hidden");
        darkModeToggle.childNodes[3].classList.remove("hidden");
    }
    
})

searchBtn.addEventListener("click", getUserInfo);


async function getUserInfo(){

    
    const response = await fetch(api + searchInput.value);
    const data = await response.json();

    if(!response?.ok){ 
        
        setTimeout(() => {
            warning.classList.add("hidden");
        }, 1500);
        
        warning.classList.remove("hidden");
        results.classList.add("hidden");
    }

    else{
        warning.classList.add("hidden");
        results.classList.remove("hidden");

        profilePhoto.setAttribute("src", data.avatar_url);

        data.name === null ? profileName.innerText = "-" : profileName.innerText = data.name;
        
        const date = new Date(data.created_at.toString());
        let dateString = "Joined " + (date.getDate() - 1)+ " " + months[date.getMonth()] + " " + date.getFullYear();
        profileCreatedTime.innerText = dateString;
        
        profileHandle.innerText = "@" + data.login;
        
        data.bio === null ? profileBio.innerText = "This profile has no bio." : profileBio.innerText = data.bio;

        repoCount.innerText = data.public_repos;
        followerCount.innerText = data.followers;
        followingCount.innerText = data.following;

        if(data.location === null){
            place.parentElement.classList.add("not-available");
            place.innerText = "Not Available"
            place.classList.remove("dark:text-white")
        } else{
            place.innerText = data.location
            place.parentElement.classList.remove("not-available");
            place.classList.add("dark:text-white")
        }
        
        if(data.twitter_username === null){
            twitterHandle.parentElement.classList.add("not-available");
            twitterHandle.innerText = "Not Available";
            twitterHandle.classList.remove("dark:text-white")
        } else{
            twitterHandle.parentElement.classList.remove("not-available");
            twitterHandle.innerText = data.twitter_username;
            twitterHandle.classList.add("dark:text-white")
        }

        if(data.blog === ""){
            website.parentElement.classList.add("not-available");
            website.innerText = "Not Available";
            website.classList.remove("dark:text-white")
        } else{
            website.parentElement.classList.remove("not-available");
            website.innerText = data.blog;
            website.classList.add("dark:text-white")
        }

        if(data.company === null){
            userCompany.parentElement.classList.add("not-available");
            userCompany.innerText = "Not Available";
            userCompany.classList.remove("dark:text-white")
        } else{
            userCompany.parentElement.classList.remove("not-available");
            userCompany.innerText = data.company;
            userCompany.classList.add("dark:text-white")
        }
        


    }
    

};


