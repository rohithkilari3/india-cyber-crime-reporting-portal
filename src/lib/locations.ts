/**
 * State -> district list used across every report flow.
 * District is mandatory so a report can be routed to the right city police
 * unit without asking the citizen to name a police station.
 */
export const DISTRICTS: Record<string, string[]> = {
  "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Kadapa", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari"],
  "Arunachal Pradesh": ["Changlang", "East Siang", "Itanagar Capital Region", "Lohit", "Lower Subansiri", "Papum Pare", "Tawang", "Tirap", "West Kameng"],
  Assam: ["Barpeta", "Cachar", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Jorhat", "Kamrup", "Kamrup Metropolitan (Guwahati)", "Karimganj", "Nagaon", "Sivasagar", "Sonitpur", "Tinsukia"],
  Bihar: ["Araria", "Begusarai", "Bhagalpur", "Darbhanga", "Gaya", "Gopalganj", "Muzaffarpur", "Nalanda", "Patna", "Purnia", "Rohtas", "Saran", "Samastipur", "Siwan", "Vaishali"],
  Chhattisgarh: ["Bastar", "Bilaspur", "Durg", "Janjgir-Champa", "Korba", "Raigarh", "Raipur", "Rajnandgaon", "Surguja"],
  Delhi: ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
  Goa: ["North Goa", "South Goa"],
  Gujarat: ["Ahmedabad", "Amreli", "Anand", "Bhavnagar", "Bhuj (Kachchh)", "Gandhinagar", "Jamnagar", "Junagadh", "Mehsana", "Rajkot", "Surat", "Vadodara", "Valsad"],
  Haryana: ["Ambala", "Faridabad", "Gurugram", "Hisar", "Jhajjar", "Karnal", "Kurukshetra", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
  "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kullu", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
  "Jammu & Kashmir": ["Anantnag", "Baramulla", "Budgam", "Jammu", "Kathua", "Kupwara", "Pulwama", "Rajouri", "Samba", "Srinagar", "Udhampur"],
  Jharkhand: ["Bokaro", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum (Jamshedpur)", "Giridih", "Hazaribagh", "Palamu", "Ramgarh", "Ranchi"],
  Karnataka: ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Chikkamagaluru", "Dakshina Kannada (Mangaluru)", "Davanagere", "Dharwad (Hubballi)", "Gadag", "Kalaburagi", "Kolar", "Mandya", "Mysuru", "Shivamogga", "Tumakuru", "Udupi", "Vijayapura"],
  Kerala: ["Alappuzha", "Ernakulam (Kochi)", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
  Ladakh: ["Kargil", "Leh"],
  "Madhya Pradesh": ["Bhopal", "Chhindwara", "Dewas", "Gwalior", "Indore", "Jabalpur", "Katni", "Rewa", "Sagar", "Satna", "Ratlam", "Ujjain", "Vidisha"],
  Maharashtra: ["Ahmednagar", "Akola", "Amravati", "Aurangabad (Chh. Sambhajinagar)", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nashik", "Navi Mumbai", "Palghar", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Solapur", "Thane"],
  Manipur: ["Bishnupur", "Churachandpur", "Imphal East", "Imphal West", "Thoubal", "Ukhrul"],
  Meghalaya: ["East Garo Hills", "East Khasi Hills (Shillong)", "Ri Bhoi", "West Garo Hills", "West Khasi Hills"],
  Mizoram: ["Aizawl", "Champhai", "Kolasib", "Lunglei", "Serchhip"],
  Nagaland: ["Dimapur", "Kohima", "Mokokchung", "Mon", "Tuensang", "Wokha"],
  Odisha: ["Angul", "Balasore", "Bargarh", "Bhadrak", "Cuttack", "Ganjam (Berhampur)", "Jajpur", "Keonjhar", "Khordha (Bhubaneswar)", "Mayurbhanj", "Puri", "Sambalpur", "Sundargarh (Rourkela)"],
  Puducherry: ["Karaikal", "Mahe", "Puducherry", "Yanam"],
  Punjab: ["Amritsar", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Firozpur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Ludhiana", "Mohali (SAS Nagar)", "Moga", "Patiala", "Sangrur"],
  Rajasthan: ["Ajmer", "Alwar", "Banswara", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Chittorgarh", "Jaipur", "Jaisalmer", "Jodhpur", "Kota", "Pali", "Sikar", "Udaipur"],
  Sikkim: ["Gangtok (East Sikkim)", "Gyalshing (West Sikkim)", "Mangan (North Sikkim)", "Namchi (South Sikkim)"],
  "Tamil Nadu": ["Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Madurai", "Nagapattinam", "Namakkal", "Salem", "Thanjavur", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Vellore"],
  Telangana: ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Karimnagar", "Khammam", "Mahbubnagar", "Medchal-Malkajgiri", "Nalgonda", "Nizamabad", "Rangareddy", "Sangareddy", "Siddipet", "Warangal"],
  Tripura: ["Dhalai", "Gomati", "North Tripura", "Sepahijala", "South Tripura", "West Tripura (Agartala)"],
  "Uttar Pradesh": ["Agra", "Aligarh", "Prayagraj", "Ayodhya", "Bareilly", "Ghaziabad", "Gorakhpur", "Jhansi", "Kanpur Nagar", "Lucknow", "Mathura", "Meerut", "Moradabad", "Muzaffarnagar", "Noida (Gautam Buddha Nagar)", "Saharanpur", "Varanasi"],
  Uttarakhand: ["Almora", "Chamoli", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Udham Singh Nagar"],
  "West Bengal": ["Bankura", "Birbhum", "Darjeeling", "Howrah", "Hooghly", "Jalpaiguri", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman (Asansol)", "Purba Bardhaman", "Purba Medinipur", "South 24 Parganas"],
  "Andaman & Nicobar Islands": ["Nicobar", "North and Middle Andaman", "South Andaman (Port Blair)"],
  Chandigarh: ["Chandigarh"],
  "Dadra & Nagar Haveli and Daman & Diu": ["Daman", "Diu", "Dadra & Nagar Haveli (Silvassa)"],
  Lakshadweep: ["Kavaratti", "Agatti", "Amini", "Andrott", "Minicoy"],
};

export function districtsFor(state: string): string[] {
  return DISTRICTS[state] ?? [];
}
