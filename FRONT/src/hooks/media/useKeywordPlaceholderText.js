import useText from '@/contexts/App/hooks/useText';
import { useState } from 'react';

const useKeywordPlaceholderText = () => {
  const searchSuggestions = useText('ui.keywordSuggestions');

  const [placeholderText] = useState(() => {
    const i = Math.floor(Math.random() * searchSuggestions.length);
    return searchSuggestions[i];
  });

  return placeholderText;
};

export default useKeywordPlaceholderText;
