# LeaderboardApi

All URIs are relative to *http://localhost:3000*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**leaderboardGet**](#leaderboardget) | **GET** /leaderboard | Get top 10 leaderboard entries|

# **leaderboardGet**
> LeaderboardGet200Response leaderboardGet()

Returns the top 10 players who won the game in the shortest time.

### Example

```typescript
import {
    LeaderboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LeaderboardApi(configuration);

const { status, data } = await apiInstance.leaderboardGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**LeaderboardGet200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A list of top leaderboard entries |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

