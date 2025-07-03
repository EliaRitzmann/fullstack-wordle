# GameStartPost200Response


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**gameId** | **string** | The unique ID of the game. | [optional] [default to undefined]
**username** | **string** | The username of the player. | [optional] [default to undefined]
**maxNumberOfGuesses** | **number** | The maximum number of guesses allowed for the game. | [optional] [default to undefined]
**wordLength** | **number** | The length of the word to guess. | [optional] [default to undefined]
**status** | **string** | The current status of the game. | [optional] [default to undefined]
**guesses** | [**Array&lt;GameStartPost200ResponseGuessesInner&gt;**](GameStartPost200ResponseGuessesInner.md) | List of guesses made by the player. | [optional] [default to undefined]
**correctWord** | **string** | The correct word for the game (only present if the game is won or lost). | [optional] [default to undefined]

## Example

```typescript
import { GameStartPost200Response } from './api';

const instance: GameStartPost200Response = {
    gameId,
    username,
    maxNumberOfGuesses,
    wordLength,
    status,
    guesses,
    correctWord,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
