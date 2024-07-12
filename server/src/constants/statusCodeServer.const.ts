const HTTP_STATUS = {
  // 1xx: Informational
  CONTINUE: 100, // The server has received the request headers and the client should proceed to send the request body.
  SWITCHING_PROTOCOLS: 101, // The requester has asked the server to switch protocols and the server has agreed to do so.
  PROCESSING: 102, // The server has received and is processing the request, but no response is available yet (WebDAV).

  // 2xx: Success
  OK: 200, // The request has succeeded.
  CREATED: 201, // The request has been fulfilled and has resulted in the creation of a new resource.
  ACCEPTED: 202, // The request has been accepted for processing, but the processing has not been completed.
  NON_AUTHORITATIVE_INFORMATION: 203, // The request has been successfully processed, but is returning information that may be from another source.
  NO_CONTENT: 204, // The server successfully processed the request, but is not returning any content.
  RESET_CONTENT: 205, // The server successfully processed the request, but is not returning any content and requires that the requester reset the document view.
  PARTIAL_CONTENT: 206, // The server is delivering only part of the resource due to a range header sent by the client.
  MULTI_STATUS: 207, // The message body that follows is by default an XML message and can contain a number of separate response codes (WebDAV).
  ALREADY_REPORTED: 208, // The members of a DAV binding have already been enumerated in a previous reply to this request, and are not being included again (WebDAV).
  IM_USED: 226, // The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.

  // 3xx: Redirection
  MULTIPLE_CHOICES: 300, // Indicates multiple options for the resource from which the client may choose.
  MOVED_PERMANENTLY: 301, // This and all future requests should be directed to the given URI.
  FOUND: 302, // Tells the client to look at (browse to) another URL.
  SEE_OTHER: 303, // The response to the request can be found under another URI using the GET method.
  NOT_MODIFIED: 304, // Indicates that the resource has not been modified since the version specified by the request headers.
  USE_PROXY: 305, // The requested resource is available only through a proxy, the address for which is provided in the response.
  TEMPORARY_REDIRECT: 307, // In this case, the request should be repeated with another URI; however, future requests should still use the original URI.
  PERMANENT_REDIRECT: 308, // The request and all future requests should be repeated using another URI.

  // 4xx: Client Error
  BAD_REQUEST: 400, // The server cannot or will not process the request due to an apparent client error.
  UNAUTHORIZED: 401, // Authentication is required and has failed or has not yet been provided.
  PAYMENT_REQUIRED: 402, // Reserved for future use.
  FORBIDDEN: 403, // The request was valid, but the server is refusing action.
  NOT_FOUND: 404, // The requested resource could not be found.
  METHOD_NOT_ALLOWED: 405, // A request method is not supported for the requested resource.
  NOT_ACCEPTABLE: 406, // The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.
  PROXY_AUTHENTICATION_REQUIRED: 407, // The client must first authenticate itself with the proxy.
  REQUEST_TIMEOUT: 408, // The server timed out waiting for the request.
  CONFLICT: 409, // Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.
  GONE: 410, // Indicates that the resource requested is no longer available and will not be available again.
  LENGTH_REQUIRED: 411, // The request did not specify the length of its content, which is required by the requested resource.
  PRECONDITION_FAILED: 412, // The server does not meet one of the preconditions that the requester put on the request.
  PAYLOAD_TOO_LARGE: 413, // The request is larger than the server is willing or able to process.
  URI_TOO_LONG: 414, // The URI provided was too long for the server to process.
  UNSUPPORTED_MEDIA_TYPE: 415, // The request entity has a media type which the server or resource does not support.
  RANGE_NOT_SATISFIABLE: 416, // The client has asked for a portion of the file (byte serving), but the server cannot supply that portion.
  EXPECTATION_FAILED: 417, // The server cannot meet the requirements of the Expect request-header field.
  IM_A_TEAPOT: 418, // I'm a teapot (RFC 2324).
  MISDIRECTED_REQUEST: 421, // The request was directed at a server that is not able to produce a response.
  UNPROCESSABLE_ENTITY: 422, // The request was well-formed but was unable to be followed due to semantic errors (WebDAV).
  LOCKED: 423, // The resource that is being accessed is locked (WebDAV).
  FAILED_DEPENDENCY: 424, // The request failed due to failure of a previous request (WebDAV).
  TOO_EARLY: 425, // Indicates that the server is unwilling to risk processing a request that might be replayed.
  UPGRADE_REQUIRED: 426, // The client should switch to a different protocol such as TLS/1.0.
  PRECONDITION_REQUIRED: 428, // The origin server requires the request to be conditional.
  TOO_MANY_REQUESTS: 429, // The user has sent too many requests in a given amount of time ("rate limiting").
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431, // The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.
  UNAVAILABLE_FOR_LEGAL_REASONS: 451, // The user requests an illegal resource, such as a web page censored by a government.

  // 5xx: Server Error
  INTERNAL_SERVER_ERROR: 500, // A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.
  NOT_IMPLEMENTED: 501, // The server either does not recognize the request method, or it lacks the ability to fulfill the request.
  BAD_GATEWAY: 502, // The server was acting as a gateway or proxy and received an invalid response from the upstream server.
  SERVICE_UNAVAILABLE: 503, // The server is currently unavailable (because it is overloaded or down for maintenance).
  GATEWAY_TIMEOUT: 504, // The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
  HTTP_VERSION_NOT_SUPPORTED: 505, // The server does not support the HTTP protocol version used in the request.
  VARIANT_ALSO_NEGOTIATES: 506, // Transparent content negotiation for the request results in a circular reference (RFC 2295).
  INSUFFICIENT_STORAGE: 507, // The server is unable to store the representation needed to complete the request (WebDAV).
  LOOP_DETECTED: 508, // The server detected an infinite loop while processing a request (WebDAV).
  NOT_EXTENDED: 510, // Further extensions to the request are required for the server to fulfill it.
  NETWORK_AUTHENTICATION_REQUIRED: 511 // The client needs to authenticate to gain network access.
}

export default HTTP_STATUS
