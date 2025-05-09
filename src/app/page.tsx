import { ChatWidget } from "./components/chat-widget.component";

export default function Home() {
  return (
    <div className="relative h-screen w-full bg-[url('/background.png')] bg-cover bg-center bg-no-repeat">
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start"></main>

        <div className="fixed bottom-10 ">
          <ChatWidget />
        </div>
      </div>
    </div>
  );
}
