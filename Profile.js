function saveProfile() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const location = document.getElementById('location').value;
  
    const profile = { username, email, age, location };
    localStorage.setItem('profile', JSON.stringify(profile));
  
    alert("Profile saved successfully!");
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    if (profile) {
      document.getElementById('username').value = profile.username;
      document.getElementById('email').value = profile.email;
      document.getElementById('age').value = profile.age;
      document.getElementById('location').value = profile.location;
    }
  });
  