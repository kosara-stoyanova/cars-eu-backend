import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "10s", target: 100 },
    { duration: "10s", target: 600 },
    { duration: "10s", target: 1000 },
    { duration: "10s", target: 10000 },
  ],
};

const BASE_URL = "http://localhost:8080";

const ENDPOINTS = ["/offers", "/transactions"];

export default function () {
  for (const endpoint of ENDPOINTS) {
    const token =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY3YmFiYWFiYTEwNWFkZDZiM2ZiYjlmZjNmZjVmZTNkY2E0Y2VkYTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2Fycy1ldSIsImF1ZCI6ImNhcnMtZXUiLCJhdXRoX3RpbWUiOjE2ODY0MDQ5NjYsInVzZXJfaWQiOiJnMGRmMzh3OUpzZ1NzbENBRVJRZXlKWWZDYnUyIiwic3ViIjoiZzBkZjM4dzlKc2dTc2xDQUVSUWV5SllmQ2J1MiIsImlhdCI6MTY4NjY3OTc2MCwiZXhwIjoxNjg2NjgzMzYwLCJlbWFpbCI6InRlc3Q4QHRlc3QudGVzdCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0OEB0ZXN0LnRlc3QiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.aP8tIwt-aNloiGv9kDBHX4V1l5g21LzBP13UbmPEz6ckALHuxhPB8iXjKIZJYS9YRrRsAnq9tcGJ2deyxg0ub2La6ck5DlgX7R_Icvrh2Kf1ElnGxkga4ZHBXLyvOwWG9yoFqOvxAQ2GaULC_V7HPjsxs9aPf7ODx2pt26W792vHm860cDnFbtkMSHN4xERjXM0OfUECoiWBqxDv6y0EXGenXK8ajZ56tcWj8_UeQZDNyDKtu1JBeX5wJ-Q85Szbr0I_uhnf30Na0OcDQr-30GPOlk0tykxBNl2p161wLSjYmhGaa6fOqSENoa7HWU97dPjruPyIQVQOvp4HVnHMvQ";

    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let res = http.get(BASE_URL + endpoint, params);

    // Check the status is 200
    check(res, {
      "status was 200": (r) => r.status == 200,
    });
  }

  sleep(1);
}
