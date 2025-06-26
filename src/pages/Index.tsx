import DigitalCard from "@/components/DigitalCard";
import LinkButton from "@/components/LinkButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#1e293b] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(142,213,149,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(142,213,149,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-emerald-400 text-sm font-medium">
              Available for projects
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            UI/UX
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent block">
              Designer
            </span>
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto leading-relaxed">
            Crafting digital experiences that blend beautiful design with
            <br className="hidden md:block" />
            seamless functionality
          </p>
        </div>

        {/* Digital Card */}
        <div className="flex justify-center">
          <DigitalCard />
        </div>

        {/* Links Section */}
        <div className="mt-20 max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Let's Connect
            </h2>
            <p className="text-slate-400 text-sm">
              Find me across different platforms
            </p>
          </div>

          <div className="space-y-3">
            <LinkButton
              href="https://dribbble.com"
              title="Dribbble"
              description="Design shots and creative inspiration"
              icon={
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm7.568 5.302c1.4 1.5 2.252 3.5 2.252 5.7-.3-.1-3.3-.6-6.07-.3-.3-.7-.6-1.5-1-2.2 3-1.2 4.518-2.9 4.818-3.2zm-1.6-1.3c-.3.3-1.7 1.9-4.6 3-.9-1.7-1.9-3.1-2.1-3.3 2.3-.3 4.6 0 6.7.3zM7.818 1.802c.2.2 1.2 1.6 2.1 3.2-2.6.7-4.9.7-5.2.7.4-1.8 1.5-3.3 3.1-3.9zm-3.1 5.8s.1 0 .1 0c.3 0 3.1 0 5.9-.8.2.4.4.8.5 1.2l-.2.1c-2.9 1-4.4 3.6-4.6 3.8-.1-.8-.1-1.6 0-2.4.2-1.1.6-2 1.3-2.9zm1.4 6.7c.2-.3 1.4-2.4 4-3.3l.1-.1c.8 2.1 1.1 3.8 1.2 4.3-1.3.5-2.5.5-3.5.3-.8-.2-1.5-.7-1.8-1.2zm6.7 1.2c-.1-.6-.4-2.3-1.2-4.4 2.6-.4 4.9.2 5.2.3-.4 2-1.7 3.6-3.4 4.2-.2 0-.4-.1-.6-.1z" />
                </svg>
              }
            />

            <LinkButton
              href="https://behance.net"
              title="Behance"
              description="Case studies and design process"
              icon={
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 2-5.101 2-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                </svg>
              }
            />

            <LinkButton
              href="https://linkedin.com"
              title="LinkedIn"
              description="Professional experience & recommendations"
              icon={
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              }
            />

            <LinkButton
              href="https://medium.com"
              title="Medium"
              description="Design articles & thought leadership"
              icon={
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
              }
            />

            <LinkButton
              href="https://figma.com/@alexjohnson"
              title="Figma Community"
              description="Design resources & UI kits"
              icon={
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.491S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117v-6.038H8.148zm7.704 0c2.476 0 4.49 2.015 4.49 4.491s-2.014 4.49-4.49 4.49c-2.476 0-4.491-2.014-4.491-4.49s2.015-4.491 4.491-4.491zm0 7.51c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019-3.019 1.355-3.019 3.019 1.354 3.019 3.019 3.019zM8.148 24c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49 4.491 2.014 4.491 4.49S10.624 24 8.148 24zm0-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019 3.019-1.354 3.019-3.019-1.355-3.019-3.019-3.019z" />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
