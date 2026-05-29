import PortfolioChatbot from "@/app/components/PortfolioChatbot";
import ChatBackButton from "@/app/components/ChatBackButton";

export const metadata = {
  title: "Chat with Tola",
  description: "Ask questions about Tola's portfolio",
};

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-zinc-50 py-12 px-4 dark:bg-zinc-900">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center gap-3">
          <ChatBackButton />
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-zinc-100">Chat with Tola</h1>
        </div>
        <PortfolioChatbot />
      </div>
    </main>
  );
}
