# http-status-kit

A simple utility kit for handling HTTP status codes and messages, providing a consistent and convenient way to manage common HTTP status scenarios.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [How to use it?](#)
- [Status Code, Name, Message](#code-name-message)
- [Contributing](#contributing)
- [License](#license)

## Description

http-status-kit is a lightweight utility kit that provides a set of HTTP status codes and messages.We are focus this messages base on users experience or UX. It simplifies the process of errors and responses in your Node.js applications.

## Installation

You can install http-status-kit using npm:

```
npm install http-status-kit
```

or using yarn:

```
yarn add http-status-kit
```

or using pnpm:

```
pnpm add http-status-kit
```

## How to use it?

```ts
import { statusCodes, statusMessages } from "http-status-kit";

// response back code with message
response.status(statusCodes.OK).send(statusMessages.OK);

response.status(statusCodes.OK).send(`PROFILE: ${statusMessages.OK}`);
response.status(statusCodes.OK).send(`PRODUCTS: ${statusMessages.OK}`);
response.status(statusCodes.OK).send(`ITEMS: ${statusMessages.OK}`);
```

## Code, Name, Message

| Code | Name                            | Message                                                                                                     |
| ---- | ------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 100  | CONTINUE                        | Continue sending data.                                                                                      |
| 101  | SWITCHING_PROTOCOLS             | Switching protocols as requested.                                                                           |
| 102  | PROCESSING                      | The server has received the request and is still processing it.                                             |
| 103  | EARLY_HINTS                     | The server is returning some headers before the final response.                                             |
| 200  | OK                              | Success! Your request has been completed.                                                                   |
| 201  | CREATED                         | Success! New resource created.                                                                              |
| 202  | ACCEPTED                        | Request received! We're working on it.                                                                      |
| 203  | NON_AUTHORITATIVE_INFORMATION   | The request was successful but the information may be from a third party.                                   |
| 204  | NO_CONTENT                      | Success! No additional content available.                                                                   |
| 205  | RESET_CONTENT                   | The request was successful, please reset the document view.                                                 |
| 206  | PARTIAL_CONTENT                 | The server is delivering only part of the resource due to a range header sent by the client.                |
| 207  | MULTI_STATUS                    | The message body contains multiple status codes for separate operations (WebDAV).                           |
| 208  | ALREADY_REPORTED                | The members of a DAV binding have already been enumerated (WebDAV).                                         |
| 226  | IM_USED                         | Server fulfilled the request with changes applied.                                                          |
| 300  | MULTIPLE_CHOICES                | Multiple options available. Please choose one.                                                              |
| 301  | MOVED_PERMANENTLY               | The requested resource has been permanently moved to a new URL.                                             |
| 302  | FOUND                           | Resource temporarily moved. Please wait while we redirect you...                                            |
| 303  | SEE_OTHER                       | The answer is accessible via a different URI with a GET request.                                            |
| 304  | NOT_MODIFIED                    | The resource is unchanged since the last request.                                                           |
| 305  | USE_PROXY                       | The requested resource must be accessed through the proxy.                                                  |
| 307  | TEMPORARY_REDIRECT              | The request should be repeated with another URI temporarily.                                                |
| 308  | PERMANENT_REDIRECT              | The request and future requests should be repeated with another URI permanently.                            |
| 400  | BAD_REQUEST                     | Request not understood due to syntax error.                                                                 |
| 401  | UNAUTHORIZED                    | You must authenticate to proceed.                                                                           |
| 402  | PAYMENT_REQUIRED                | Payment is required to access the requested resource.                                                       |
| 403  | FORBIDDEN                       | You don't have permission to view this.                                                                     |
| 404  | NOT_FOUND                       | Requested resource unavailable.                                                                             |
| 405  | METHOD_NOT_ALLOWED              | The method specified in the request is not allowed for the resource.                                        |
| 406  | NOT_ACCEPTABLE                  | Requested resource can't provide acceptable content.                                                        |
| 407  | PROXY_AUTHENTICATION_REQUIRED   | The client must authenticate itself with the proxy.                                                         |
| 408  | REQUEST_TIMEOUT                 | The server timed out waiting for the request.                                                               |
| 409  | CONFLICT                        | The request conflicts with the current state of the resource.                                               |
| 410  | GONE                            | The requested resource is no longer available and will not be available again.                              |
| 411  | LENGTH_REQUIRED                 | The server requires the Content-Length header to be sent with the request.                                  |
| 412  | PRECONDITION_FAILED             | One or more conditions given in the request header fields were evaluated as false.                          |
| 413  | PAYLOAD_TOO_LARGE               | The request is larger than the server is willing or able to process.                                        |
| 414  | URI_TOO_LONG                    | The URI provided was too long for the server to process.                                                    |
| 415  | UNSUPPORTED_MEDIA_TYPE          | The media format of the requested data is not supported by the server.                                      |
| 416  | RANGE_NOT_SATISFIABLE           | The range specified by the Range header field in the request can't be fulfilled.                            |
| 417  | EXPECTATION_FAILED              | The expectation given in the request header could not be met by the server.                                 |
| 418  | IM_A_TEAPOT                     | The server refuses the attempt to brew coffee with a teapot.                                                |
| 421  | MISDIRECTED_REQUEST             | The request was directed at a server that is not able to produce a response.                                |
| 422  | UNPROCESSABLE_ENTITY            | The request was well-formed but was unable to be followed due to semantic errors.                           |
| 423  | LOCKED                          | The resource that is being accessed is locked.                                                              |
| 424  | FAILED_DEPENDENCY               | The request failed due to failure of a previous request.                                                    |
| 425  | TOO_EARLY                       | The server is unwilling to risk processing a request that might be replayed.                                |
| 426  | UPGRADE_REQUIRED                | The client should switch to a different protocol.                                                           |
| 428  | PRECONDITION_REQUIRED           | The origin server requires the request to be conditional.                                                   |
| 429  | TOO_MANY_REQUESTS               | You've sent too many requests.                                                                              |
| 431  | REQUEST_HEADER_FIELDS_TOO_LARGE | The server is unwilling to process the request because its header fields are too large.                     |
| 451  | UNAVAILABLE_FOR_LEGAL_REASONS   | The server is denying access to the resource as a consequence of a legal demand.                            |
| 500  | INTERNAL_SERVER_ERROR           | An unexpected error occurred.                                                                               |
| 501  | NOT_IMPLEMENTED                 | The server does not support the functionality required to fulfill the request.                              |
| 502  | BAD_GATEWAY                     | The server, while acting as a gateway or proxy, received an invalid response from the upstream server.      |
| 503  | SERVICE_UNAVAILABLE             | Server not ready, try again later.                                                                          |
| 504  | GATEWAY_TIMEOUT                 | The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server. |
| 505  | HTTP_VERSION_NOT_SUPPORTED      | The server does not support the HTTP protocol version that was used in the request.                         |
| 506  | VARIANT_ALSO_NEGOTIATES         | The server has an internal configuration error and needs to negotiate a different variant.                  |
| 507  | INSUFFICIENT_STORAGE            | The server is unable to store the representation needed to complete the request.                            |
| 508  | LOOP_DETECTED                   | The server detected an infinite loop while processing the request (WebDAV).                                 |
| 510  | NOT_EXTENDED                    | Further extensions to the request are required for the server to fulfill it.                                |

## Contributing

If you'd like to contribute to http-status-kit, please fork the repository and submit a pull request. You can also report issues or suggest new features on the issue tracker.

## License

http-status-kit is licensed under the ISC license.
