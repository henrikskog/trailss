import axios from "axios";

const BackendClient = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 1000,
    headers: {
      //'Authorization': 'token <your-token-here> -- https://docs.GitHub.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
    }
  });