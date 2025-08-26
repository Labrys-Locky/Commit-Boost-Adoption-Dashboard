"use client"
import { Button } from "@/components/ui/button"
import { ExternalLink, Shield, Zap, Users, Code, Globe, XCircle, Quote, Github } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import AdoptionChart from "@/components/AdoptionChart"

function HeroSection() {
  const [adoptionData, setAdoptionData] = useState({ 
    percentage: 20, 
    chartData: [], 
    loading: true 
  });

  useEffect(() => {
    const fetchAdoptionData = async () => {
      try {
        const response = await fetch('/api/grafana-data');
        const data = await response.json();
        const commitBoostPercentage = Math.round(data.latest.agents['commit-boost'] * 100);
        setAdoptionData({ 
          percentage: commitBoostPercentage, 
          chartData: data.chartData || [],
          loading: false 
        });
      } catch (error) {
        console.error('Failed to fetch adoption data:', error);
        setAdoptionData({ percentage: 20, chartData: [], loading: false });
      }
    };

    fetchAdoptionData();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div
          className="absolute top-20 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ backgroundColor: "#12036c" }}
        ></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div
          className="absolute bottom-20 left-1/2 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"
          style={{ backgroundColor: "#12036c" }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pt-20">
        <div className="max-w-4xl mx-auto">
          {/* Completely redesigned hero section */}
          <div className="mb-16">
            {/* Logo positioned above title */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full opacity-70 blur-md"></div>
                <div className="relative h-24 w-24 bg-white rounded-full p-4 flex items-center justify-center">
                  <Image
                    src="/commit-boost-logo.png"
                    alt="Commit-Boost Logo"
                    width={72}
                    height={72}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Title with modern, cleaner typography */}
            <h1 className="text-7xl font-extrabold tracking-tight text-white mb-4">
              Commit-
              <span className="text-blue-400">Boost</span>
            </h1>

            {/* Subtitle with improved visual design */}
            <div className="max-w-2xl mx-auto">
              <div className="h-px w-24 bg-blue-500/50 mx-auto my-6"></div>
              <p className="text-xl md:text-2xl text-blue-100/80 font-light">
                A standardized sidecar for Ethereum validators
              </p>
            </div>
          </div>

          {/* Centered description */}
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
            <a
              href="https://x.com/Commit_Boost"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200 underline decoration-blue-400 underline-offset-4 transition-colors"
            >
              Commit-Boost
            </a>{" "}
            is a sidecar developed as an open-source public good that reduces risk for Ethereum and standardizes how
            proposers make commitments around blockspace. It's the only non-venture-backed sidecar with no monetization
            or token, developed by the Ethereum community for Ethereum.
          </p>

          {/* Adoption Stats Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Estimated Percentage Share of Sidecars Used by Validators</h2>


            {/* Adoption Chart */}
            <div className="mb-6">
              <AdoptionChart data={adoptionData.chartData} loading={adoptionData.loading} />
            </div>

            <div
              className="rounded-xl p-4"
              style={{ backgroundColor: "rgba(18, 3, 108, 0.2)", border: "1px solid rgba(18, 3, 108, 0.3)" }}
            >
              <p className="text-sm text-blue-200">
                The data is based on self-reported information from staking entities and heuristics provided by various
                relays.
              </p>
            </div>
          </div>

          {/* Resources Section (Moved here) */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://github.com/Commit-Boost/commit-boost-client"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                    GitHub
                  </h3>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-300 transition-colors" />
                </div>
                <p className="text-sm text-gray-300 text-left">Source code and development</p>
              </a>
              <a
                href="https://commit-boost.github.io/commit-boost-client/"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                    Documentation
                  </h3>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-300 transition-colors" />
                </div>
                <p className="text-sm text-gray-300 text-left">Complete guides and API reference</p>
              </a>
              <a
                href="https://commit-boost.github.io/commit-boost-client/category/running"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                    Installation Guide
                  </h3>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-300 transition-colors" />
                </div>
                <p className="text-sm text-gray-300 text-left">Step-by-step setup instructions</p>
              </a>
              <a
                href="https://x.com/Commit_Boost"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                    Follow Us
                  </h3>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-300 transition-colors" />
                </div>
                <p className="text-sm text-gray-300 text-left">Latest updates and announcements</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
        style={{ background: "linear-gradient(135deg, #12036c 0%, #3b82f6 100%)" }}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  )
}

function TestimonialCard({ quote, author, link }: { quote: string; author: string; link?: string }) {
  const content = (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300">
      <div className="flex mb-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #12036c 0%, #3b82f6 100%)" }}
        >
          <Quote className="w-5 h-5 text-white" />
        </div>
        <p className="text-gray-300 italic leading-relaxed">{quote}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-blue-300">{author}</p>
        {link && <ExternalLink className="w-4 h-4 text-gray-400" />}
      </div>
    </div>
  )

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    )
  }

  return content
}

function WhatIsSection() {
  const features = [
    {
      icon: Shield,
      title: "Unification During Forks",
      description:
        "Core developers can rely on a single, standardized interface during Ethereum forks, upgrades, or in cases where things go wrong.",
    },
    {
      icon: Zap,
      title: "Backward Compatibility",
      description:
        "Fully backward compatible with the current PBS Pipeline, while offering improved telemetry, reporting, and plug-and-play tools.",
    },
    {
      icon: Users,
      title: "Single Sidecar, Multiple Commitments",
      description: "Proposers can opt into additional commitments without needing to run multiple sidecars.",
    },
    {
      icon: Globe,
      title: "Robust Non-Profit Support",
      description: "Maintained by a not-for-profit entity dedicated to testing, fork readiness, and validator support.",
    },
    {
      icon: Code,
      title: "No VC Backing",
      description: "Not venture-funded. No token, no monetization plan, and no intent to spin off commercial services.",
    },
    {
      icon: ExternalLink,
      title: "Permissionless to Build On",
      description:
        "Commit-Boost is designed for anyone to build on top of it, not limiting transaction flows or protocol development.",
    },
  ]

  const notFeatures = [
    "It is not a protocol that defines or restricts constraint types.",
    "It does not dictate who can create, aggregate, or pack constraints into blocks.",
    "It does not enforce validator behavior—validators opt into constraints voluntarily.",
    "It does not define consequences if a signed constraint is omitted from a block.",
  ]

  const testimonials = [
    {
      quote:
        "As a solo-staker I care about client diversity and a decorrelated software stack. CB represents a missing piece of the puzzle here, while also allowing me to tap into preconfirmations and other proposer commitment types in the future.",
      author: "Solo Staker",
    },
    {
      quote:
        "Great performance, high integrity team. Having a single top-notch sidecar reduces the risk surface of preconfs a lot.",
      author: "Node Operator",
      link: "https://x.com/mostlyblocks/status/1884594976723489105",
    },
    {
      quote:
        'Thanks to the team for building credibly neutral, open-source Ethereum tooling. We fear a "sidecar-hell" is approaching Ethereum staking and CB is looking like a path to redemption.',
      author: "Client Team",
      link: "https://x.com/sigp_io/status/1884428998211686434",
    },
    {
      quote:
        "A big shoutout to the people working on Commit-Boost—having all these metrics at our fingertips is incredibly useful.",
      author: "DVT Node Operator",
      link: "https://x.com/SerenitaIO/status/1883986467925680172",
    },
    {
      quote:
        "We think Commit Boost is an essential piece of the puzzle to achieve L1 pre-confirmations and improve Ethereum by enabling new block production flows.",
      author: "Node Operator",
      link: "https://x.com/Kiln_finance/status/1889295745754239369",
    },
    {
      quote:
        "Unlike typical operating systems where there is little choice and vendor lock-in, Commit-Boost works like an app-store, where any developer and team can create Apps or 'modules' for Validators...",
      author: "Module Developer",
      link: "https://www.ethgas.com/blog/how-ethgas-works-with-commit-boost-to-boost-apys",
    },
    {
      quote:
        "The importance of Commit-Boost cannot be overstated, especially as we stand on the brink of a proposer-commitment renaissance.",
      author: "LRT, Preconf, Based rollup",
      link: "https://medium.com/puffer-fi/puffer-embraces-commit-boost-standardizing-the-future-of-proposer-commitments-01ee9ef2f1e3",
    },
    {
      quote:
        "Based rollups are emerging as Ethereum's most aligned scaling path — but to get there, we need shared infrastructure, common language, and open standards.",
      author: "Based Rollup",
      link: "https://taiko.mirror.xyz/7_FNvOGfu81imp6A6EucFDoRcKU6E94j4izNEPiugmE",
    },
  ]

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header with unified content */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-8">
            What is Commit-Boost?
          </h2>

          <div className="max-w-4xl mx-auto text-lg text-gray-300 leading-relaxed">
            <p className="mb-6">
              Commit-Boost is an open-source public good developed in response to emerging risks facing Ethereum, its
              core development, and validator set. Built collaboratively by teams and individuals across the Ethereum
              ecosystem, Commit-Boost provides a lightweight validator-sidecar platform for making safe, standardized
              commitments.
            </p>
            <p className="mb-6">
              Specifically, Commit-Boost aims to streamline the "last mile" of communication between validators and
              third-party protocols. Written from scratch in Rust, it's designed with safety and modularity in
              mind—ensuring it doesn't impose limits on downstream stakeholders, proposer flows, commitment types, or
              enforcement mechanisms.
            </p>
            <p>
              What began as a small collaboration has grown into a community-driven initiative. Commit-Boost is a fully
              open-source, grant-funded effort built by Ethereum contributors—for Ethereum. No tokens. No monetization.
              Just software that supports the health and resilience of the Ethereum network.
            </p>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>

        {/* What it's NOT section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-8">What Commit-Boost Is Not</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {notFeatures.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-white/10">
            <p className="text-gray-300 text-center">
              It simply standardizes how validators signal their intent to include a constraint.
            </p>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-8">Examples of What the Community Is Saying</h3>
          <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            Commit-Boost is being used and supported by all shapes and sizes of validators and by multiple types of
            teams building modules.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                link={testimonial.link}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Component() {
  return (
    <div className="min-h-screen bg-slate-900">
      <HeroSection />
      <WhatIsSection />

      {/* Footer */}
      <div className="bg-slate-900 py-12 border-t border-white/10">
        <div className="text-center space-y-4">
          <Button
            variant="outline"
            className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300"
            onClick={() =>
              window.open("https://github.com/Commit-Boost/commit-boost-client/blob/main/TERMS-OF-USE.md", "_blank")
            }
          >
            Commit-Boost Terms of Use
          </Button>

          <div className="pt-4">
            <a
              href="https://github.com/Labrys-Locky/Commit-Boost-Adoption-Dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-300 transition-colors text-sm"
            >
              <Github className="w-4 h-4" />
              Made by the Commit-Boost Community
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
