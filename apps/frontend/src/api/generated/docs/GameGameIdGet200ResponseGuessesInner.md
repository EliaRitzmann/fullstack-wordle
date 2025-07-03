# GameGameIdGet200ResponseGuessesInner


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**guessId** | **string** | The unique ID of the guess. | [optional] [default to undefined]
**currentTry** | **number** | The current attempt number for this guess. | [optional] [default to undefined]
**maxTries** | **number** | The maximum number of tries allowed for this game. | [optional] [default to undefined]
**username** | **string** | The username of the player making the guess. | [optional] [default to undefined]
**yourGuess** | **string** | The word guessed by the player. | [optional] [default to undefined]
**guessResult** | **string** | Feedback for the guess, indicating letter correctness. \&quot;-\&quot; for not in word, \&quot;*\&quot; for in word and \&quot;+\&quot; for correct position. | [optional] [default to undefined]

## Example

```typescript
import { GameGameIdGet200ResponseGuessesInner } from './api';

const instance: GameGameIdGet200ResponseGuessesInner = {
    guessId,
    currentTry,
    maxTries,
    username,
    yourGuess,
    guessResult,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
