import Voice, {
  SpeechErrorEvent,
  SpeechResultsEvent,
} from "@react-native-voice/voice";
import { useCallback, useEffect, useState } from "react";

interface IState {
  recognized: string;
  pitch: string;
  error: string;
  end: string;
  started: string;
  results: string[];
  partialResults: string[];
  isRecording: boolean;
}

export const useVoiceRecognition = () => {
  const [state, setState] = useState<IState>({
    recognized: "",
    pitch: "",
    error: "",
    end: "",
    started: "",
    results: [],
    partialResults: [],
    isRecording: false,
  });

  const resetState = useCallback(() => {
    setState({
      recognized: "",
      pitch: "",
      error: "",
      end: "",
      started: "",
      results: [],
      partialResults: [],
      isRecording: false,
    });
  }, []);

  const startRecognizing = useCallback(async () => {
    resetState();
    try {
      await Voice.start("en-US");
    } catch (error) {
      console.log(error);
    }
  }, [resetState]);

  const stopRecognizing = useCallback(async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const cancelRecognizing = useCallback(async () => {
    try {
      await Voice.cancel();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const destroyRecognizing = useCallback(async () => {
    try {
      await Voice.destroy();
    } catch (error) {
      console.log(error);
    }

    resetState();
  }, [resetState]);

  useEffect(() => {
    const onSpeechStart = (e: any) => {
      setState((prev) => ({
        ...prev,
        started: "✅",
        isRecording: true,
      }));
    };

    const onSpeechRecognized = (e: any) => {
      setState((prev) => ({
        ...prev,
        recognized: "✅",
      }));
    };

    const onSpeechEnd = (e: any) => {
      setState((prev) => ({
        ...prev,
        end: "✅",
        isRecording: false,
      }));
    };

    const onSpeechError = (e: SpeechErrorEvent) => {
      setState((prev) => ({
        ...prev,
        error: JSON.stringify(e),
        isRecording: false,
      }));
    };

    const onSpeechResults = (e: SpeechResultsEvent) => {
      if (e.value) {
        setState((prev) => ({
          ...prev,
          results: e.value!,
        }));
      }
    };

    const onSpeechPartialResults = (e: SpeechResultsEvent) => {
      if (e.value) {
        setState((prev) => ({
          ...prev,
          partialResults: e.value!,
        }));
      }
    };

    const onSpeechVolumeChanged = (e: any) => {
      if (e.value) {
        setState((prev) => ({
          ...prev,
          pitch: e.value,
        }));
      }
    };

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return {
    state,
    startRecognizing,
    stopRecognizing,
    cancelRecognizing,
    destroyRecognizing,
  };
};
