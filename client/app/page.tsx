import Chat from "@/app/components/Chat";
import { Card } from "@/components/ui/card"; // ShadCN's Card component

const Home: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-900">
      <Card className="w-full max-w-4xl h-auto p-8 bg-gray-800 border border-gray-700 shadow-lg rounded-lg">
        <Chat />
      </Card>
    </div>
  );
};

export default Home;
