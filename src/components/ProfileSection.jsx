import React, { useState, useEffect } from 'react';
import { 
  User, MapPin, Heart, Calendar, Phone, Camera, 
  FileText, Bell, Users, Settings, Shield, 
  Edit, Plus, Trash2, Upload, Download, AlertCircle
} from 'lucide-react';
import { theme } from '../theme';
import { getUserProfile, saveUserProfile } from '../utils/auth';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const ProfileSection = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('personal');
  const [user, setUser] = useState({
    // Personal Information
    fullName: '',
    profilePhoto: null,
    age: '',
    dateOfBirth: '',
    gender: '',
    mobileNumber: '',
    email: '',
    address: {
      village: '',
      block: '',
      district: '',
      state: ''
    },
    
    // Medical Information
    bloodGroup: '',
    height: '',
    weight: '',
    allergies: [],
    existingConditions: [],
    currentMedications: [],
    
    // Health Records
    symptomCheckHistory: [],
    telemedicineHistory: [],
    uploadedReports: [],
    doctorNotes: '',
    
    // Vaccination Status
    completedVaccines: [],
    upcomingDoses: [],
    missedDoses: [],
    childImmunizationChart: [],
    
    // Reminders
    activeReminders: [],
    medicineReminders: [],
    vaccinationReminders: [],
    prenatalReminders: [],
    followUpReminders: [],
    
    // Family Members
    familyMembers: [],
    
    // Emergency Information
    emergencyContact: '',
    medicalAllergies: [],
    chronicDiseases: '',
    emergencyNotes: '',
    
    // App Settings
    language: 'en',
    notifications: {
      email: true,
      sms: true,
      push: true
    },
    privacyConsent: false
  });

  const [newAllergy, setNewAllergy] = useState('');
  const [newCondition, setNewCondition] = useState('');
  const [newMedication, setNewMedication] = useState('');
  const [newFamilyMember, setNewFamilyMember] = useState({
    name: '',
    relation: '',
    age: '',
    profilePhoto: null
  });

  // Load user profile on component mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getUserProfile();
        if (profile) {
          setUser(prev => ({
            ...prev,
            fullName: profile.name || '',
            email: profile.email || '',
            // Load other profile data from localStorage or IndexedDB
            ...JSON.parse(localStorage.getItem('userProfileData') || '{}')
          }));
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    };
    
    loadProfile();
  }, []);

  // Save profile data to localStorage
  const saveProfileData = (data) => {
    localStorage.setItem('userProfileData', JSON.stringify(data));
  };

  // Handle input changes
  const handleInputChange = (section, field, value) => {
    const updatedUser = {
      ...user,
      [section]: {
        ...user[section],
        [field]: value
      }
    };
    setUser(updatedUser);
    saveProfileData(updatedUser);
  };

  // Handle address changes
  const handleAddressChange = (field, value) => {
    const updatedUser = {
      ...user,
      address: {
        ...user.address,
        [field]: value
      }
    };
    setUser(updatedUser);
    saveProfileData(updatedUser);
  };

  // Add allergy
  const addAllergy = () => {
    if (newAllergy.trim()) {
      const updatedUser = {
        ...user,
        allergies: [...user.allergies, newAllergy.trim()]
      };
      setUser(updatedUser);
      saveProfileData(updatedUser);
      setNewAllergy('');
    }
  };

  // Remove allergy
  const removeAllergy = (index) => {
    const updatedAllergies = [...user.allergies];
    updatedAllergies.splice(index, 1);
    const updatedUser = {
      ...user,
      allergies: updatedAllergies
    };
    setUser(updatedUser);
    saveProfileData(updatedUser);
  };

  // Add existing condition
  const addCondition = () => {
    if (newCondition.trim()) {
      const updatedUser = {
        ...user,
        existingConditions: [...user.existingConditions, newCondition.trim()]
      };
      setUser(updatedUser);
      saveProfileData(updatedUser);
      setNewCondition('');
    }
  };

  // Remove condition
  const removeCondition = (index) => {
    const updatedConditions = [...user.existingConditions];
    updatedConditions.splice(index, 1);
    const updatedUser = {
      ...user,
      existingConditions: updatedConditions
    };
    setUser(updatedUser);
    saveProfileData(updatedUser);
  };

  // Add medication
  const addMedication = () => {
    if (newMedication.trim()) {
      const updatedUser = {
        ...user,
        currentMedications: [...user.currentMedications, newMedication.trim()]
      };
      setUser(updatedUser);
      saveProfileData(updatedUser);
      setNewMedication('');
    }
  };

  // Remove medication
  const removeMedication = (index) => {
    const updatedMedications = [...user.currentMedications];
    updatedMedications.splice(index, 1);
    const updatedUser = {
      ...user,
      currentMedications: updatedMedications
    };
    setUser(updatedUser);
    saveProfileData(updatedUser);
  };

  // Add family member
  const addFamilyMember = () => {
    if (newFamilyMember.name && newFamilyMember.relation) {
      const updatedUser = {
        ...user,
        familyMembers: [...user.familyMembers, { ...newFamilyMember, id: Date.now() }]
      };
      setUser(updatedUser);
      saveProfileData(updatedUser);
      setNewFamilyMember({
        name: '',
        relation: '',
        age: '',
        profilePhoto: null
      });
    }
  };

  // Remove family member
  const removeFamilyMember = (id) => {
    const updatedFamilyMembers = user.familyMembers.filter(member => member.id !== id);
    const updatedUser = {
      ...user,
      familyMembers: updatedFamilyMembers
    };
    setUser(updatedUser);
    saveProfileData(updatedUser);
  };

  // Handle file upload
  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'profile') {
          const updatedUser = { ...user, profilePhoto: e.target.result };
          setUser(updatedUser);
          saveProfileData(updatedUser);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Tab configuration
  const tabs = [
    { id: 'personal', label: translations[language].personalInfo, icon: User },
    { id: 'medical', label: translations[language].medicalInfo, icon: Heart },
    { id: 'records', label: translations[language].healthRecords, icon: FileText },
    { id: 'vaccination', label: translations[language].vaccination, icon: Calendar },
    { id: 'reminders', label: translations[language].reminders, icon: Bell },
    { id: 'family', label: translations[language].familyMembers, icon: Users },
    { id: 'emergency', label: translations[language].emergencyInfo, icon: Phone },
    { id: 'settings', label: translations[language].appSettings, icon: Settings }
  ];

  // Render personal information section
  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Profile Photo */}
      <div className="flex items-center gap-6">
        <div className="relative">
          {user.profilePhoto ? (
            <img 
              src={user.profilePhoto} 
              alt={translations[language].profile} 
              className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-green-600 flex items-center justify-center text-white text-2xl font-bold">
              {user.fullName ? user.fullName.charAt(0) : translations[language].user.charAt(0)}
            </div>
          )}
          <label className="absolute bottom-0 right-0 bg-teal-500 rounded-full p-2 cursor-pointer">
            <Camera className="w-4 h-4 text-white" />
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={(e) => handleFileUpload(e, 'profile')}
            />
          </label>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{user.fullName || translations[language].userProfile}</h3>
          <p className="text-gray-300">{translations[language].managePersonalInfo}</p>
        </div>
      </div>

      {/* Personal Details Form */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-white mb-2">{translations[language].fullName}</label>
          <input
            type="text"
            value={user.fullName}
            onChange={(e) => setUser({...user, fullName: e.target.value})}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={translations[language].enterFullName}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white mb-2">{translations[language].mobileNumber}</label>
          <input
            type="tel"
            value={user.mobileNumber}
            onChange={(e) => setUser({...user, mobileNumber: e.target.value})}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={translations[language].enterMobileNumber}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white mb-2">{translations[language].emailOptional}</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={translations[language].enterEmail}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white mb-2">{translations[language].dateOfBirth}</label>
          <input
            type="date"
            value={user.dateOfBirth}
            onChange={(e) => setUser({...user, dateOfBirth: e.target.value})}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white mb-2">{translations[language].age}</label>
          <input
            type="number"
            value={user.age}
            onChange={(e) => setUser({...user, age: e.target.value})}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={translations[language].enterAge}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white mb-2">{translations[language].gender}</label>
          <select
            value={user.gender}
            onChange={(e) => setUser({...user, gender: e.target.value})}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">{translations[language].selectGender}</option>
            <option value="male">{translations[language].male}</option>
            <option value="female">{translations[language].female}</option>
            <option value="other">{translations[language].other}</option>
          </select>
        </div>
      </div>

      {/* Address Section */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">{translations[language].addressInfo}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">{translations[language].village}</label>
            <input
              type="text"
              value={user.address.village}
              onChange={(e) => handleAddressChange('village', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder={translations[language].enterVillage}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">{translations[language].block}</label>
            <input
              type="text"
              value={user.address.block}
              onChange={(e) => handleAddressChange('block', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder={translations[language].enterBlock}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">{translations[language].district}</label>
            <input
              type="text"
              value={user.address.district}
              onChange={(e) => handleAddressChange('district', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder={translations[language].enterDistrict}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">{translations[language].state}</label>
            <input
              type="text"
              value={user.address.state}
              onChange={(e) => handleAddressChange('state', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder={translations[language].enterState}
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Render medical information section
  const renderMedicalInfo = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-white mb-2">{translations[language].bloodGroup}</label>
          <select
            value={user.bloodGroup}
            onChange={(e) => setUser({...user, bloodGroup: e.target.value})}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">{translations[language].selectBloodGroup}</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white mb-2">{translations[language].heightCm}</label>
          <input
            type="number"
            value={user.height}
            onChange={(e) => setUser({...user, height: e.target.value})}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={translations[language].enterHeight}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white mb-2">{translations[language].weightKg}</label>
          <input
            type="number"
            value={user.weight}
            onChange={(e) => setUser({...user, weight: e.target.value})}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={translations[language].enterWeight}
          />
        </div>
      </div>

      {/* Allergies */}
      <div>
        <h3 className="text-lg font-bold text-white mb-3">{translations[language].allergies}</h3>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newAllergy}
            onChange={(e) => setNewAllergy(e.target.value)}
            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={translations[language].addAllergy}
          />
          <button 
            onClick={addAllergy}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            {translations[language].add}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {user.allergies.map((allergy, index) => (
            <div key={index} className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-3 py-1">
              <span className="text-red-300 text-sm">{allergy}</span>
              <button 
                onClick={() => removeAllergy(index)}
                className="text-red-300 hover:text-white"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Existing Medical Conditions */}
      <div>
        <h3 className="text-lg font-bold text-white mb-3">{translations[language].existingConditions}</h3>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newCondition}
            onChange={(e) => setNewCondition(e.target.value)}
            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={translations[language].addCondition}
          />
          <button 
            onClick={addCondition}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            {translations[language].add}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {user.existingConditions.map((condition, index) => (
            <div key={index} className="flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-3 py-1">
              <span className="text-purple-300 text-sm">{condition}</span>
              <button 
                onClick={() => removeCondition(index)}
                className="text-purple-300 hover:text-white"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
          {[
            translations[language].bp,
            translations[language].diabetes,
            translations[language].asthma,
            translations[language].heartIssues
          ].map((condition) => (
            <button
              key={condition}
              onClick={() => {
                if (!user.existingConditions.includes(condition)) {
                  setNewCondition(condition);
                  setTimeout(addCondition, 100);
                }
              }}
              className={`px-3 py-2 rounded-lg text-sm ${
                user.existingConditions.includes(condition)
                  ? 'bg-purple-500/30 border border-purple-500 text-purple-300'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {condition}
            </button>
          ))}
        </div>
      </div>

      {/* Current Medications */}
      <div>
        <h3 className="text-lg font-bold text-white mb-3">{translations[language].currentMedications}</h3>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newMedication}
            onChange={(e) => setNewMedication(e.target.value)}
            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={translations[language].addMedication}
          />
          <button 
            onClick={addMedication}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            {translations[language].add}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {user.currentMedications.map((medication, index) => (
            <div key={index} className="flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-3 py-1">
              <span className="text-blue-300 text-sm">{medication}</span>
              <button 
                onClick={() => removeMedication(index)}
                className="text-blue-300 hover:text-white"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render health records section
  const renderHealthRecords = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* AI Symptom Check History */}
        <div className={`${theme.glass.heavy} rounded-2xl p-5`}>
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-white">{translations[language].symptomCheckHistory}</h3>
          </div>
          <div className="space-y-3">
            {user.symptomCheckHistory.length > 0 ? (
              user.symptomCheckHistory.slice(0, 3).map((record, index) => (
                <div key={index} className="p-3 bg-white/5 rounded-lg">
                  <div className="text-white font-medium">{record.date}</div>
                  <div className="text-gray-300 text-sm">{record.symptoms}</div>
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-center py-4">
                {translations[language].noSymptomHistory}
              </div>
            )}
            <button className={`${theme.button.ghost} w-full py-2 text-sm`}>
              {translations[language].viewAllHistory}
            </button>
          </div>
        </div>

        {/* Telemedicine Consultation History */}
        <div className={`${theme.glass.heavy} rounded-2xl p-5`}>
          <div className="flex items-center gap-3 mb-4">
            <Phone className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-white">{translations[language].telemedicineHistory}</h3>
          </div>
          <div className="space-y-3">
            {user.telemedicineHistory.length > 0 ? (
              user.telemedicineHistory.slice(0, 3).map((record, index) => (
                <div key={index} className="p-3 bg-white/5 rounded-lg">
                  <div className="text-white font-medium">{record.doctor}</div>
                  <div className="text-gray-300 text-sm">{record.date}</div>
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-center py-4">
                {translations[language].noTelemedicineHistory}
              </div>
            )}
            <button className={`${theme.button.ghost} w-full py-2 text-sm`}>
              {translations[language].viewAllConsultations}
            </button>
          </div>
        </div>
      </div>

      {/* Uploaded Reports */}
      <div className={`${theme.glass.heavy} rounded-2xl p-5`}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-white">{translations[language].uploadedReports}</h3>
          </div>
          <button className={`${theme.button.primary} px-4 py-2 text-sm flex items-center gap-2`}>
            <Upload className="w-4 h-4" />
            {translations[language].uploadReport}
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.uploadedReports.length > 0 ? (
            user.uploadedReports.slice(0, 3).map((report, index) => (
              <div key={index} className="p-3 bg-white/5 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">{report.name}</div>
                  <div className="text-gray-300 text-sm">{report.date}</div>
                </div>
                <button className="text-primary hover:text-white">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center py-4 col-span-full">
              {translations[language].noReportsUploaded}
            </div>
          )}
        </div>
      </div>

      {/* Doctor Notes */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">{translations[language].doctorNotes}</label>
        <textarea
          value={user.doctorNotes}
          onChange={(e) => setUser({...user, doctorNotes: e.target.value})}
          rows={4}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder={translations[language].addDoctorNotes}
        />
      </div>
    </div>
  );

  // Render vaccination section
  const renderVaccination = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Completed Vaccines */}
        <div className={`${theme.glass.heavy} rounded-2xl p-5`}>
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-bold text-white">{translations[language].completedVaccines}</h3>
          </div>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {user.completedVaccines.length > 0 ? (
              user.completedVaccines.map((vaccine, index) => (
                <div key={index} className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <div className="text-white font-medium">{vaccine.name}</div>
                  <div className="text-green-300 text-sm">{vaccine.date}</div>
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-center py-4">
                {translations[language].noCompletedVaccines}
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Doses */}
        <div className={`${theme.glass.heavy} rounded-2xl p-5`}>
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-bold text-white">{translations[language].upcomingDoses}</h3>
          </div>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {user.upcomingDoses.length > 0 ? (
              user.upcomingDoses.map((vaccine, index) => (
                <div key={index} className="p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                  <div className="text-white font-medium">{vaccine.name}</div>
                  <div className="text-yellow-300 text-sm">{vaccine.date}</div>
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-center py-4">
                {translations[language].noUpcomingDoses}
              </div>
            )}
          </div>
        </div>

        {/* Missed Doses */}
        <div className={`${theme.glass.heavy} rounded-2xl p-5`}>
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-bold text-white">{translations[language].missedDoses}</h3>
          </div>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {user.missedDoses.length > 0 ? (
              user.missedDoses.map((vaccine, index) => (
                <div key={index} className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <div className="text-white font-medium">{vaccine.name}</div>
                  <div className="text-red-300 text-sm">{vaccine.date}</div>
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-center py-4">
                {translations[language].noMissedDoses}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Child Immunization Chart */}
      <div className={`${theme.glass.heavy} rounded-2xl p-5`}>
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-white">{translations[language].childImmunizationChart}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-2 px-3 text-sm text-gray-300">{translations[language].vaccine}</th>
                <th className="text-left py-2 px-3 text-sm text-gray-300">{translations[language].age}</th>
                <th className="text-left py-2 px-3 text-sm text-gray-300">{translations[language].status}</th>
                <th className="text-left py-2 px-3 text-sm text-gray-300">{translations[language].dueDate}</th>
              </tr>
            </thead>
            <tbody>
              {user.childImmunizationChart.length > 0 ? (
                user.childImmunizationChart.map((vaccine, index) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="py-2 px-3 text-white">{vaccine.name}</td>
                    <td className="py-2 px-3 text-gray-300">{vaccine.age}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        vaccine.status === 'completed' 
                          ? 'bg-green-500/20 text-green-300' 
                          : vaccine.status === 'pending' 
                            ? 'bg-yellow-500/20 text-yellow-300' 
                            : 'bg-red-500/20 text-red-300'
                      }`}>
                        {vaccine.status}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-gray-300">{vaccine.dueDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-400">
                    {translations[language].noImmunizationData}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render reminders section
  const renderReminders = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { title: translations[language].activeReminders, count: user.activeReminders.length, color: 'teal' },
          { title: translations[language].medicine, count: user.medicineReminders.length, color: 'blue' },
          { title: translations[language].vaccination, count: user.vaccinationReminders.length, color: 'purple' },
          { title: translations[language].prenatalAnc, count: user.prenatalReminders.length, color: 'pink' },
          { title: translations[language].followUp, count: user.followUpReminders.length, color: 'indigo' }
        ].map((reminder, index) => (
          <div key={index} className={`${theme.glass.heavy} rounded-2xl p-4 text-center`}>
            <div className={`text-2xl font-bold text-${reminder.color}-400 mb-1`}>{reminder.count}</div>
            <div className="text-gray-300 text-sm">{reminder.title}</div>
          </div>
        ))}
      </div>

      {/* Reminder List */}
      <div className={`${theme.glass.heavy} rounded-2xl p-5`}>
        <h3 className="text-lg font-bold text-white mb-4">{translations[language].activeReminders}</h3>
        <div className="space-y-3">
          {user.activeReminders.length > 0 ? (
            user.activeReminders.slice(0, 5).map((reminder, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="text-white font-medium">{reminder.title}</div>
                  <div className="text-gray-300 text-sm">{reminder.time}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    reminder.type === 'medicine' 
                      ? 'bg-blue-500/20 text-blue-300' 
                      : reminder.type === 'vaccination' 
                        ? 'bg-purple-500/20 text-purple-300' 
                        : 'bg-teal-500/20 text-teal-300'
                  }`}>
                    {reminder.type}
                  </span>
                  <button className="text-red-400 hover:text-white">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center py-4">
              {translations[language].noActiveReminders}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render family members section
  const renderFamilyMembers = () => (
    <div className="space-y-6">
      {/* Add Family Member Form */}
      <div className={`${theme.glass.heavy} rounded-2xl p-5`}>
        <h3 className="text-lg font-bold text-white mb-4">{translations[language].addFamilyMember}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">{translations[language].name}</label>
            <input
              type="text"
              value={newFamilyMember.name}
              onChange={(e) => setNewFamilyMember({...newFamilyMember, name: e.target.value})}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder={translations[language].enterName}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">{translations[language].relation}</label>
            <select
              value={newFamilyMember.relation}
              onChange={(e) => setNewFamilyMember({...newFamilyMember, relation: e.target.value})}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">{translations[language].selectRelation}</option>
              <option value="mother">{translations[language].mother}</option>
              <option value="father">{translations[language].father}</option>
              <option value="child">{translations[language].child}</option>
              <option value="spouse">{translations[language].spouse}</option>
              <option value="elder">{translations[language].elder}</option>
              <option value="other">{translations[language].other}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">{translations[language].age}</label>
            <input
              type="number"
              value={newFamilyMember.age}
              onChange={(e) => setNewFamilyMember({...newFamilyMember, age: e.target.value})}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder={translations[language].enterAge}
            />
          </div>
          
          <div className="flex items-end">
            <button 
              onClick={addFamilyMember}
              className={`${theme.button.primary} w-full py-2 flex items-center justify-center gap-2`}
            >
              <Plus className="w-4 h-4" />
              {translations[language].addMember}
            </button>
          </div>
        </div>
      </div>

      {/* Family Members List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {user.familyMembers.map((member) => (
          <div key={member.id} className={`${theme.glass.heavy} rounded-2xl p-4`}>
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                {member.profilePhoto ? (
                  <img 
                    src={member.profilePhoto} 
                    alt={member.name} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-green-600 flex items-center justify-center text-white font-bold">
                    {member.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="text-white font-medium">{member.name}</div>
                  <div className="text-gray-300 text-sm capitalize">{member.relation}</div>
                </div>
              </div>
              <button 
                onClick={() => removeFamilyMember(member.id)}
                className="text-red-400 hover:text-white"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="text-gray-300 text-sm">
              {translations[language].age}: {member.age || translations[language].notSpecified}
            </div>
            <button className={`${theme.button.ghost} w-full mt-3 py-2 text-sm`}>
              {translations[language].viewProfile}
            </button>
          </div>
        ))}
        
        {user.familyMembers.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-400">
            {translations[language].noFamilyMembers}
          </div>
        )}
      </div>
    </div>
  );

  // Render emergency information section
  const renderEmergencyInfo = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-white mb-2">{translations[language].emergencyContact}</label>
          <input
            type="tel"
            value={user.emergencyContact}
            onChange={(e) => setUser({...user, emergencyContact: e.target.value})}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={translations[language].enterEmergencyContact}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white mb-2">{translations[language].chronicDiseases}</label>
          <input
            type="text"
            value={user.chronicDiseases}
            onChange={(e) => setUser({...user, chronicDiseases: e.target.value})}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={translations[language].listChronicDiseases}
          />
        </div>
      </div>

      {/* Medical Allergies */}
      <div>
        <h3 className="text-lg font-bold text-white mb-3">{translations[language].medicalAllergies}</h3>
        <div className="flex flex-wrap gap-2">
          {user.medicalAllergies.map((allergy, index) => (
            <div key={index} className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-3 py-1">
              <span className="text-red-300 text-sm">{allergy}</span>
              <button 
                onClick={() => {
                  const updatedAllergies = [...user.medicalAllergies];
                  updatedAllergies.splice(index, 1);
                  setUser({...user, medicalAllergies: updatedAllergies});
                }}
                className="text-red-300 hover:text-white"
              >
                ×
              </button>
            </div>
          ))}
          <input
            type="text"
            placeholder={translations[language].addMedicalAllergy}
            className="px-3 py-1 bg-white/10 border border-white/20 text-white rounded-full text-sm"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                setUser({
                  ...user, 
                  medicalAllergies: [...user.medicalAllergies, e.target.value.trim()]
                });
                e.target.value = '';
              }
            }}
          />
        </div>
      </div>

      {/* Emergency Notes */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">{translations[language].emergencyNotes}</label>
        <textarea
          value={user.emergencyNotes}
          onChange={(e) => setUser({...user, emergencyNotes: e.target.value})}
          rows={4}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder={translations[language].emergencyNotesPlaceholder}
        />
      </div>

      {/* Quick Emergency Contacts */}
      <div className={`${theme.glass.heavy} rounded-2xl p-5`}>
        <h3 className="text-lg font-bold text-white mb-4">{translations[language].quickEmergencyContacts}</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { name: translations[language].ashaWorker, number: '9876543210' },
            { name: translations[language].healthCenter, number: '0123456789' },
            { name: translations[language].ambulance108, number: '108' },
            { name: translations[language].familyContact, number: '9999999999' }
          ].map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <div className="text-white font-medium">{contact.name}</div>
                <div className="text-gray-300">{contact.number}</div>
              </div>
              <button className="px-3 py-1 bg-red-500/80 text-white rounded-lg text-sm hover:bg-red-600">
                {translations[language].call}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render app settings section
  const renderAppSettings = () => (
    <div className="space-y-6">
      {/* Profile Management */}
      <div className={`${theme.glass.heavy} rounded-2xl p-5`}>
        <h3 className="text-lg font-bold text-white mb-4">{translations[language].profileManagement}</h3>
        <div className="space-y-4">
          <button className={`${theme.button.ghost} w-full py-3 flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <Edit className="w-5 h-5 text-primary" />
              <span>{translations[language].editProfile}</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>
          
          <button className={`${theme.button.ghost} w-full py-3 flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <span>{translations[language].changePassword}</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>
        </div>
      </div>

      {/* Language Settings */}
      <div className={`${theme.glass.heavy} rounded-2xl p-5`}>
        <h3 className="text-lg font-bold text-white mb-4">{translations[language].languageSettings}</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { code: 'en', name: translations[language].english },
            { code: 'hi', name: translations[language].hindi },
            { code: 'cg', name: translations[language].chhattisgarhi }
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => setUser({...user, language: lang.code})}
              className={`py-3 rounded-lg ${
                user.language === lang.code
                  ? 'bg-gradient-to-r from-teal-500 to-green-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      <div className={`${theme.glass.heavy} rounded-2xl p-5`}>
        <h3 className="text-lg font-bold text-white mb-4">{translations[language].notificationSettings}</h3>
        <div className="space-y-3">
          {[
            { id: 'email', label: translations[language].emailNotifications },
            { id: 'sms', label: translations[language].smsAlerts },
            { id: 'push', label: translations[language].pushNotifications }
          ].map((notification) => (
            <div key={notification.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-gray-300">{notification.label}</span>
              <div 
                onClick={() => {
                  const updatedNotifications = {
                    ...user.notifications,
                    [notification.id]: !user.notifications[notification.id]
                  };
                  setUser({
                    ...user,
                    notifications: updatedNotifications
                  });
                }}
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                  user.notifications[notification.id] ? 'bg-primary' : 'bg-gray-600'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full transition-transform ${
                  user.notifications[notification.id] ? 'translate-x-6' : ''
                }`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy & Data Consent */}
      <div className={`${theme.glass.heavy} rounded-2xl p-5`}>
        <h3 className="text-lg font-bold text-white mb-4">{translations[language].privacyDataConsent}</h3>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={user.privacyConsent}
            onChange={(e) => setUser({...user, privacyConsent: e.target.checked})}
            className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary bg-white/10"
          />
          <label className="text-gray-300">
            {translations[language].privacyConsentText}
          </label>
        </div>
      </div>

      {/* Account Actions */}
      <div className={`${theme.glass.heavy} rounded-2xl p-5`}>
        <h3 className="text-lg font-bold text-white mb-4">{translations[language].accountActions}</h3>
        <div className="space-y-3">
          <button className={`${theme.button.ghost} w-full py-3 text-left flex items-center gap-3`}>
            <Download className="w-5 h-5 text-primary" />
            <span>{translations[language].exportHealthData}</span>
          </button>
          
          <button className={`${theme.button.ghost} w-full py-3 text-left flex items-center gap-3`}>
            <Upload className="w-5 h-5 text-primary" />
            <span>{translations[language].importHealthData}</span>
          </button>
          
          <button className="w-full py-3 text-left flex items-center gap-3 text-red-400 hover:bg-red-500/20 rounded-lg">
            <Trash2 className="w-5 h-5" />
            <span>{translations[language].deleteAccount}</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Render current section based on active tab
  const renderCurrentSection = () => {
    switch (activeTab) {
      case 'personal': return renderPersonalInfo();
      case 'medical': return renderMedicalInfo();
      case 'records': return renderHealthRecords();
      case 'vaccination': return renderVaccination();
      case 'reminders': return renderReminders();
      case 'family': return renderFamilyMembers();
      case 'emergency': return renderEmergencyInfo();
      case 'settings': return renderAppSettings();
      default: return renderPersonalInfo();
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{translations[language].myProfile}</h1>
          <p className="text-gray-300">{translations[language].manageHealthInfo}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className={`${theme.glass.heavy} rounded-2xl p-4`}>
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-teal-500/30 text-white'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className={`${theme.glass.heavy} rounded-2xl p-6`}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h2>
              </div>
              {renderCurrentSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;