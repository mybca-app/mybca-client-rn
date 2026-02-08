import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { paths } from "./openapi/v1";

const fetchClient = createFetchClient<paths>({
  baseUrl: "https://services.mybca.link/",
});
export const $api = createClient(fetchClient);