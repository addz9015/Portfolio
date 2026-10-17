import { useEffect, useRef, useState } from "react";
import ArcheryTarget from "@/components/ArcheryTarget";

/**
 * The About section as one chat window: the message thread scrolls on the left while the
 * photo sits still on the right. Bubbles pop in as they scroll into view, and an archery
 * target lands on the floor of the visible message area and takes an arrow.
 */
export default function AboutChat() {
  const threadRef = useRef<HTMLDivElement>(null);
  const [photoFailed, setPhotoFailed] = useState(false);

  useEffect(() => {
    const thread = threadRef.current;
    if (!thread) return;
    // on phones the thread doesn't scroll on its own, so watch the page instead
    const scrollsItself = thread.scrollHeight > thread.clientHeight + 1;
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { root: scrollsItself ? thread : null, threshold: 0.2 }
    );
    thread
      .querySelectorAll(".chat-reveal")
      .forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-chat">
      <div className="about-chat-head">
        <span className="about-chat-avatar">AN</span>
        <span className="about-chat-who">
          <strong>Advika Nagool</strong>
          <small>
            <i className="about-chat-online" /> online
          </small>
        </span>
        <span className="about-chat-tag mono">about.chat</span>
      </div>

      <div className="about-chat-main">
        <div className="about-chat-pane">
          {/* data-lenis-prevent lets the thread scroll itself instead of the page */}
          <div className="about-chat-thread" ref={threadRef} data-lenis-prevent>
            <div className="chat-bubble chat-bubble-blue chat-reveal">
              <p className="chat-display">
                Not just a list of things I&apos;ve done.
                <br />
                <span>I like the messy middle.</span>
              </p>
            </div>

            <div className="chat-bubble chat-reveal">
              <p className="chat-lead">
                That is where I like to spend my time{" "}
                <mark>understanding problems from the inside</mark>,
                questioning what I know, and experimenting until an idea starts
                to work. I enjoy taking complex ideas apart and figuring out
                what makes them tick, whether I&apos;m working with data,
                building an AI system, reading research, or following an
                unexpected rabbit hole. I&apos;m usually driven by the same
                question: <mark>why does this work?</mark>
              </p>
            </div>

            <div className="chat-bubble chat-reveal">
              <p>
                My interests span{" "}
                <strong>
                  data science, machine learning, AI, and quantum
                  computing
                </strong>
                , but curiosity rarely stays within one field. I like learning
                by trying, refining, and sometimes getting things wrong
                because the failed approach, unexpected result, or small
                correction can teach you more than the final solution.
              </p>
            </div>

            <div className="chat-bubble chat-bubble-ink chat-reveal">
              <p>
                That instinct follows me outside technology too. From hitting
                the{" "}
                <strong>bull&apos;s-eye in archery and rifle shooting</strong>{" "}
                to getting a guitar chord just right, I&apos;ve learned to
                appreciate{" "}
                <em>precision, patience, and the tiny adjustments</em> that make
                a difference. Different interests, same habit: keep
                experimenting, keep refining, and follow the question wherever
                it leads.
              </p>
            </div>

            <span className="chat-seen mono chat-reveal">seen ✓✓</span>
            <div className="chat-typing chat-reveal" aria-label="typing">
              <i />
              <i />
              <i />
            </div>
          </div>

          <div className="about-chat-target-layer">
            <ArcheryTarget />
          </div>
        </div>

        <figure className="about-chat-photo">
          {photoFailed ? (
            <div className="about-photo-fallback" aria-hidden="true">
              <span>AN</span>
              <small>add /advika-photo.jpg</small>
            </div>
          ) : (
            <img
              src={`${import.meta.env.BASE_URL}advika-photo.jpg`}
              alt="Advika Nagool smiling in a teal blazer"
              onError={() => setPhotoFailed(true)}
            />
          )}
        </figure>
      </div>
    </div>
  );
}
