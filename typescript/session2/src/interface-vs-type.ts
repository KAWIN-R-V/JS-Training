/*
1. API Pagination Response

Interface chosen because it describes
an object shape that may be extended.
*/

interface PaginationResponse<T> {
  page: number;
  pageSize: number;
  total: number;
  data: T[];
}

/*
2. String OR String Array

Type chosen because unions
are better represented using type aliases.
*/

type StringOrArray =
  | string
  | string[];

/*
3. Notification

Interface chosen because future
notification types can extend it.
*/

interface Notification {
  id: string;
  message: string;
}

interface EmailNotification
  extends Notification {
  email: string;
}

interface PushNotification
  extends Notification {
  deviceId: string;
}

/*
4. Callback

Type alias is preferred for function types.
*/

type NumberProcessor = (
  value: number
) => void;

/*
5. HTTP Methods

Union types are best represented
with type aliases.
*/

type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH";

const apiResponse: PaginationResponse<string> = {
  page: 1,
  pageSize: 10,
  total: 100,
  data: ["A", "B", "C"]
};

const method: HttpMethod = "GET";

console.log(apiResponse);
console.log(method);