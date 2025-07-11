# GameApi

All URIs are relative to *http://localhost:3000*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**gameGameIdGet**](#gamegameidget) | **GET** /game/{gameId} | Retrieve game details|
|[**gameGuessPost**](#gameguesspost) | **POST** /game/guess | Submit a word guess for a game|
|[**gameStartPost**](#gamestartpost) | **POST** /game/start | Start a new game|

# **gameGameIdGet**
> GameGameIdGet200Response gameGameIdGet()

Fetch the details of a specific game using its unique gameId.

### Example

```typescript
import {
    GameApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new GameApi(configuration);

let gameId: string; //The unique identifier of the game. Must be a valid UUID. (default to undefined)

const { status, data } = await apiInstance.gameGameIdGet(
    gameId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **gameId** | [**string**] | The unique identifier of the game. Must be a valid UUID. | defaults to undefined|


### Return type

**GameGameIdGet200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully retrieved the game details. |  -  |
|**400** | Bad request due to invalid gameId format. |  -  |
|**404** | Game not found. |  -  |
|**500** | Internal server error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gameGuessPost**
> GameGameIdGet200ResponseGuessesInner gameGuessPost()

Make a guess for the word in a specific game. The gameId and the wordGuess must be provided.

### Example

```typescript
import {
    GameApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new GameApi(configuration);

let gameId: string; //The unique identifier of the game. Must be a valid UUID. (default to undefined)
let wordGuess: string; //The word being guessed. Must be a non-empty string. (default to undefined)

const { status, data } = await apiInstance.gameGuessPost(
    gameId,
    wordGuess
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **gameId** | [**string**] | The unique identifier of the game. Must be a valid UUID. | defaults to undefined|
| **wordGuess** | [**string**] | The word being guessed. Must be a non-empty string. | defaults to undefined|


### Return type

**GameGameIdGet200ResponseGuessesInner**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully submitted the guess. |  -  |
|**400** | Bad request due to invalid gameId or wordGuess. |  -  |
|**404** | Game not found. |  -  |
|**500** | Internal server error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gameStartPost**
> GameStartPost200Response gameStartPost()

Start a new game with the given username, maximum number of guesses, and word length.

### Example

```typescript
import {
    GameApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new GameApi(configuration);

let username: string; //The username of the player. Must be 4-20 characters long and only contain lowercase letters. (default to undefined)
let maxNumberOfGuesses: number; //The maximum number of guesses allowed. Must be between 1 and 10. Defaults to 6. (optional) (default to undefined)
let wordLength: number; //The length of the word to guess. Must be greater than 3. Defaults to 5. (optional) (default to undefined)

const { status, data } = await apiInstance.gameStartPost(
    username,
    maxNumberOfGuesses,
    wordLength
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **username** | [**string**] | The username of the player. Must be 4-20 characters long and only contain lowercase letters. | defaults to undefined|
| **maxNumberOfGuesses** | [**number**] | The maximum number of guesses allowed. Must be between 1 and 10. Defaults to 6. | (optional) defaults to undefined|
| **wordLength** | [**number**] | The length of the word to guess. Must be greater than 3. Defaults to 5. | (optional) defaults to undefined|


### Return type

**GameStartPost200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully retrieved the game details. |  -  |
|**400** | Bad request due to invalid input. |  -  |
|**500** | Internal server error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

