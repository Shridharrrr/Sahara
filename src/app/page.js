"use client";

import React from "react";
import Router, { useRouter } from "next/navigation";
import {
  Mic,
  Sparkles,
  Shield,
  Zap,
  CheckCircle,
  Download,
} from "lucide-react";

function App() {

  const router = useRouter();
  const features = [
    {
      icon: Mic,
      title: "Voice-First Interface",
      description:
        "Simply speak your needs and let our AI understand your situation in natural language.",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Matching",
      description:
        "Advanced algorithms analyze your voice input to find the most relevant benefit schemes.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your voice data is processed securely with end-to-end encryption and privacy protection.",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description:
        "Get personalized benefit matches in seconds, not hours of manual searching.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative z-10 bg-white backdrop-blur-md border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Sahara
              </span>
            </div>
            <nav className="flex items-center space-x-8">
              <button onClick={() => router.push("/auth")} className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                Get Started
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative  pt-20 pb-8 px-4 sm:px-6 lg:px-8 bg-blue-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Benefits
              </span>{" "}
              with AI
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
              Speak naturally about your situation and let our advanced AI match
              you with government benefits, grants, and support schemes you
              qualify for.
            </p>
          </div>
          <div className="flex items-center justify-center">
          <img src="hands.png" width={300}></img>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Sahara Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to discover benefits you never knew existed
            </p>
            
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mic className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                1. Speak Your Needs
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Tell Sahara about your situation using natural language. No
                forms, no complexity - just speak as you would to a friend.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                2. AI Analysis
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our advanced AI processes your voice input and analyzes
                thousands of benefit programs to find perfect matches.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                3. Get Matched
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Receive personalized benefit recommendations with application
                guidance and eligibility requirements.
              </p>
            </div>

            
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-20 bg-gradient-to-br from-indigo-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced technology meets human-centered design
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Discover Your Benefits?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
            Join thousands of users who have found life-changing benefits
            through Sahara's AI-powered matching.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button onClick={() => router.push("/auth")} className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Get Started Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
          <div className=" border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 Sahara. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
}

export default App;
