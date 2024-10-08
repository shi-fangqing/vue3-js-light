import request from "@/util/request.js";
import MockAdapter from "axios-mock-adapter";

const Mock = new MockAdapter(request);
export default Mock;
