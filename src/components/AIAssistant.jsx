import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageSquare, X } from "lucide-react";

const SUGGESTIONS = [
  "Siapa Yusuf?",
  "Project apa saja yang pernah dibuat?",
  "Skill apa yang dikuasai?",
  "Bagaimana cara menghubungi?",
];

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => inputRef.current?.focus(), 150);
    return () => clearTimeout(id);
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, pending, error]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function ask(history) {
    setPending(true);
    setError("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data.error || "Asisten gagal menjawab.");
      if (typeof data.reply !== "string") throw new Error("Asisten tidak memberi jawaban.");

      setMessages([...history, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(err.message || "Gagal menghubungi asisten.");
    } finally {
      setPending(false);
    }
  }

  function send(text) {
    const question = text.trim();
    if (!question || pending) return;

    const history = [...messages, { role: "user", content: question }];
    setMessages(history);
    setInput("");
    ask(history);
  }

  function handleSubmit(event) {
    event.preventDefault();
    send(input);
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Asisten AI"
            className="fixed inset-x-3 bottom-3 top-20 z-[60] flex flex-col overflow-hidden border border-[#0D0D0D] bg-white shadow-2xl sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[560px] sm:max-h-[calc(100vh-8rem)] sm:w-[400px]"
          >
            <header className="flex items-start justify-between gap-3 border-b border-[#DCD9D2] px-4 py-3">
              <div>
                <h2 className="text-sm font-bold tracking-tight text-[#0D0D0D]">Asisten Yusuf</h2>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                  Tanya portofolio atau hal umum
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Tutup asisten"
                className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center text-neutral-500 transition hover:text-[#0D0D0D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D0D0D]/30"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed text-neutral-700">
                    Halo, aku asisten Yusuf. Tanya apa saja soal portofolio, skill, project, atau hal umum.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((question) => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => send(question)}
                        className="border border-neutral-300 px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-600 transition hover:border-[#0D0D0D] hover:text-[#0D0D0D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D0D0D]/30"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[85%] whitespace-pre-wrap break-words px-3 py-2 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-[#0D0D0D] text-white"
                        : "border border-[#DCD9D2] bg-[#F4F3EF] text-neutral-800"
                    }`}
                  >
                    {message.content}
                  </p>
                </div>
              ))}

              {pending && (
                <div className="flex justify-start">
                  <div
                    className="flex items-center gap-1 border border-[#DCD9D2] bg-[#F4F3EF] px-3 py-2.5"
                    aria-label="Asisten sedang mengetik"
                  >
                    <span className="h-1.5 w-1.5 animate-bounce bg-neutral-400 [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce bg-neutral-400 [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce bg-neutral-400" />
                  </div>
                </div>
              )}

              {error && (
                <div className="border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
                  <p>{error}</p>
                  <button
                    type="button"
                    onClick={() => ask(messages)}
                    className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] underline underline-offset-2 hover:text-red-900"
                  >
                    Coba lagi
                  </button>
                </div>
              )}

              <div ref={endRef} />
            </div>

            <form onSubmit={handleSubmit} className="border-t border-[#DCD9D2] p-3">
              <div className="flex items-end gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Tanya apa saja..."
                  maxLength={1000}
                  aria-label="Pesan untuk asisten"
                  className="h-11 min-w-0 flex-1 border border-neutral-300 bg-white px-3 text-sm text-[#0D0D0D] placeholder:text-neutral-400 focus:border-[#0D0D0D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D0D0D]/20"
                />
                <button
                  type="submit"
                  disabled={pending || !input.trim()}
                  aria-label="Kirim pesan"
                  className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#0D0D0D] text-white transition hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D0D0D]/30 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] leading-relaxed text-neutral-500">
                Jawaban AI bisa salah. Data penting cek di Contact.
              </p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Buka asisten AI"
          title="Tanya asisten AI"
          className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 bg-[#0D0D0D] px-4 py-3 text-white shadow-lg transition hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D0D0D]/40 focus-visible:ring-offset-2"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Tanya AI</span>
        </button>
      )}
    </>
  );
}
