import axios from 'axios';

export const sendMessage = async (
  messages: Message[],
  input: string,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!input.trim()) return; // Avoid sending empty messages
  
  const userMessage: Message = { role: 'user', content: input };
  
  // Add the user's message to the chat
  setMessages((prevMessages) => [...prevMessages, userMessage]);
  setInput(''); // Clear input field
  setIsLoading(true); // Set loading to true before sending the request

  try {
    const response = await axios.post('http://localhost:5000/api/chat', { message: input });

    if (response.data && response.data.message) {
      const botMessage: Message = { role: 'assistant', content: response.data.message };
      setMessages((prevMessages) => [...prevMessages, botMessage]); // Add bot response
    } else {
      const fallbackMessage: Message = { role: 'assistant', content: "Sorry, something went wrong." };
      setMessages((prevMessages) => [...prevMessages, fallbackMessage]);
    }
  } catch (error) {
    console.error('Error sending message:', error);
    const errorMessage: Message = { role: 'assistant', content: "Error: Could not send message." };
    setMessages((prevMessages) => [...prevMessages, errorMessage]); // Show error in chat
  } finally {
    setIsLoading(false); // Reset loading state after completion
  }
};
