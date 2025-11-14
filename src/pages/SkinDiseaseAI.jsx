import { theme } from '../theme';
import { Camera, Upload, Brain, AlertTriangle, CheckCircle, FileImage, Zap, Shield } from 'lucide-react';

export default function SkinDiseaseAI() {
  return (
    <div className="p-6 mt-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-bold text-white mb-4 ${theme.animation.fadeInUp}`}>
          Skin Disease AI Detector
        </h1>
        <p className={`text-xl text-gray-300 max-w-3xl mx-auto ${theme.animation.fadeInUp} ${theme.animation.delay100}`}>
          Upload an image of a skin condition for AI-powered analysis. Our advanced algorithm 
          can detect common skin conditions with high accuracy.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className={`${theme.glass.heavy} rounded-3xl p-8`}>
          <h2 className="text-2xl font-bold text-white mb-6">Upload Skin Image</h2>
          
          <div className="border-2 border-dashed border-white/30 rounded-2xl p-8 text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Upload Image</h3>
            <p className="text-gray-400 mb-4">Drag & drop your image here or click to browse</p>
            <button className={`${theme.button.primary} px-6 py-2`}>
              <Upload className="w-4 h-4 mr-2 inline" />
              Choose File
            </button>
            <p className="text-sm text-gray-500 mt-3">Supports JPG, PNG up to 10MB</p>
          </div>
          
          <div className="flex gap-3">
            <button className={`${theme.button.primary} flex-1 py-3`}>
              <Zap className="w-4 h-4 mr-2 inline" />
              Analyze Image
            </button>
            <button className={`${theme.button.outline} py-3`}>
              <FileImage className="w-4 h-4 mr-2 inline" />
              Sample Images
            </button>
          </div>
        </div>
        
        {/* Results Preview */}
        <div className={`${theme.glass.heavy} rounded-3xl p-8`}>
          <h2 className="text-2xl font-bold text-white mb-6">AI Analysis Results</h2>
          
          <div className="bg-white/5 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-purple" />
              <div>
                <div className="font-semibold text-white">AI Analysis</div>
                <div className="text-sm text-gray-400">Powered by deep learning algorithms</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-purple/10 rounded-xl border border-purple/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-white">Melanoma Risk</span>
                  <span className="text-red-400 font-bold">High</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              
              <div className="p-4 bg-teal/10 rounded-xl border border-teal/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-white">Eczema</span>
                  <span className="text-teal-400 font-bold">Low</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-teal-500 h-2 rounded-full" style={{width: '25%'}}></div>
                </div>
              </div>
              
              <div className="p-4 bg-blue/10 rounded-xl border border-blue/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-white">Psoriasis</span>
                  <span className="text-blue-400 font-bold">Medium</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '60%'}}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div>
              <div className="font-medium text-yellow-300">Important Notice</div>
              <p className="text-sm text-gray-300">
                This analysis is for informational purposes only. Always consult with a healthcare 
                professional for accurate diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works */}
      <div className={`${theme.glass.heavy} rounded-3xl p-8 mt-12`}>
        <h2 className="text-3xl font-bold text-white text-center mb-4">How Skin Disease Detection Works</h2>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Our AI system uses advanced computer vision and deep learning to analyze skin conditions
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Camera,
              title: 'Image Capture',
              desc: 'Upload a clear photo of the affected skin area',
              step: '01'
            },
            {
              icon: Brain,
              title: 'AI Analysis',
              desc: 'Our algorithm analyzes patterns and features in the image',
              step: '02'
            },
            {
              icon: CheckCircle,
              title: 'Results',
              desc: 'Get instant analysis with risk assessment and recommendations',
              step: '03'
            }
          ].map((item, i) => (
            <div 
              key={i} 
              className={`text-center p-6 rounded-2xl bg-white/5 ${theme.animation.fadeInUp} animate-delay-${(i + 1) * 100}`}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                {item.step}
              </div>
              <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Security and Privacy */}
      <div className={`${theme.glass.heavy} rounded-3xl p-8 mt-8`}>
        <h2 className="text-3xl font-bold text-white text-center mb-4">Your Privacy & Security</h2>
        <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
          We prioritize your privacy and data security with enterprise-grade protection
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
            <Shield className="w-8 h-8 text-primary mt-1" />
            <div>
              <h3 className="text-lg font-bold text-white mb-2">End-to-End Encryption</h3>
              <p className="text-gray-300">
                All images and data are encrypted during transmission and storage
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
            <Shield className="w-8 h-8 text-primary mt-1" />
            <div>
              <h3 className="text-lg font-bold text-white mb-2">HIPAA Compliant</h3>
              <p className="text-gray-300">
                We follow strict healthcare data protection regulations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}