#!/usr/bin/env python3
"""
Skill Wise - Indian Skill Swap Platform Backend Simulation
A comprehensive backend simulation for Indian tech professionals with user profiles, authentication, 
swap requests, and admin functionality. Includes comprehensive technical skills across all technology domains.
"""

import datetime
from typing import List, Dict, Optional, Tuple
from enum import Enum
import uuid
import random


class RequestStatus(Enum):
    PENDING = "Pending"
    ACCEPTED = "Accepted"
    REJECTED = "Rejected"


class TechnicalSkills:
    """Comprehensive list of technical skills across all domains"""
    
    # Programming Languages
    PROGRAMMING_LANGUAGES = [
        "Python", "JavaScript", "TypeScript", "Java", "C++", "C#", "C", "Go", "Rust", "Swift",
        "Kotlin", "Scala", "Ruby", "PHP", "Perl", "R", "MATLAB", "Julia", "Dart", "Elixir",
        "Erlang", "Haskell", "F#", "Clojure", "Lua", "Assembly", "COBOL", "Fortran", "Ada",
        "Pascal", "Delphi", "Visual Basic", "PowerShell", "Bash", "Zsh", "Fish Shell"
    ]
    
    # Web Development
    WEB_DEVELOPMENT = [
        "HTML5", "CSS3", "SASS", "LESS", "Stylus", "Bootstrap", "Tailwind CSS", "Bulma",
        "React", "Vue.js", "Angular", "Svelte", "Next.js", "Nuxt.js", "Gatsby", "Remix",
        "Node.js", "Express.js", "Koa.js", "Fastify", "NestJS", "Django", "Flask", "FastAPI",
        "Ruby on Rails", "Laravel", "Symfony", "CodeIgniter", "Spring Boot", "ASP.NET",
        "Blazor", "Phoenix", "Gin", "Echo", "Fiber", "Actix Web", "Rocket"
    ]
    
    # Mobile Development
    MOBILE_DEVELOPMENT = [
        "React Native", "Flutter", "Xamarin", "Ionic", "Cordova", "PhoneGap", "NativeScript",
        "iOS Development", "Android Development", "SwiftUI", "UIKit", "Jetpack Compose",
        "Kotlin Multiplatform", "Unity Mobile", "Unreal Engine Mobile", "Progressive Web Apps"
    ]
    
    # Database Technologies
    DATABASES = [
        "MySQL", "PostgreSQL", "SQLite", "Microsoft SQL Server", "Oracle Database", "MariaDB",
        "MongoDB", "CouchDB", "Amazon DynamoDB", "Cassandra", "Redis", "Memcached",
        "Elasticsearch", "Apache Solr", "Neo4j", "ArangoDB", "InfluxDB", "TimescaleDB",
        "Firebase Firestore", "Supabase", "PlanetScale", "Fauna", "Prisma", "TypeORM",
        "Sequelize", "Mongoose", "SQLAlchemy", "Hibernate", "Entity Framework"
    ]
    
    # Cloud Platforms & Services
    CLOUD_PLATFORMS = [
        "Amazon Web Services (AWS)", "Microsoft Azure", "Google Cloud Platform", "IBM Cloud",
        "Oracle Cloud", "DigitalOcean", "Linode", "Vultr", "Heroku", "Vercel", "Netlify",
        "Railway", "Render", "Fly.io", "PlanetScale", "Supabase", "Firebase", "Appwrite",
        "AWS Lambda", "Azure Functions", "Google Cloud Functions", "Cloudflare Workers"
    ]
    
    # DevOps & Infrastructure
    DEVOPS = [
        "Docker", "Kubernetes", "Jenkins", "GitLab CI/CD", "GitHub Actions", "CircleCI",
        "Travis CI", "Azure DevOps", "TeamCity", "Bamboo", "Ansible", "Terraform",
        "Pulumi", "CloudFormation", "ARM Templates", "Vagrant", "Packer", "Consul",
        "Vault", "Nomad", "Prometheus", "Grafana", "ELK Stack", "Splunk", "Datadog",
        "New Relic", "Nagios", "Zabbix", "Chef", "Puppet", "SaltStack"
    ]
    
    # Data Science & Analytics
    DATA_SCIENCE = [
        "Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision",
        "Data Analysis", "Statistical Analysis", "Predictive Modeling", "Time Series Analysis",
        "A/B Testing", "Data Visualization", "Business Intelligence", "ETL Processes",
        "TensorFlow", "PyTorch", "Scikit-learn", "Keras", "Pandas", "NumPy", "Matplotlib",
        "Seaborn", "Plotly", "D3.js", "Tableau", "Power BI", "Looker", "Apache Spark",
        "Apache Kafka", "Apache Airflow", "Jupyter Notebooks", "Google Colab", "MLflow"
    ]
    
    # Cybersecurity
    CYBERSECURITY = [
        "Penetration Testing", "Vulnerability Assessment", "Network Security", "Web Security",
        "Mobile Security", "Cloud Security", "Incident Response", "Digital Forensics",
        "Malware Analysis", "Reverse Engineering", "Cryptography", "PKI", "SIEM",
        "Threat Intelligence", "Risk Assessment", "Compliance (SOX, HIPAA, GDPR)",
        "Ethical Hacking", "Bug Bounty", "Security Auditing", "Firewall Configuration",
        "IDS/IPS", "Wireshark", "Metasploit", "Burp Suite", "Nmap", "OWASP", "Kali Linux"
    ]
    
    # Game Development
    GAME_DEVELOPMENT = [
        "Unity", "Unreal Engine", "Godot", "GameMaker Studio", "Construct 3", "Defold",
        "Cocos2d", "Phaser", "Three.js", "Babylon.js", "OpenGL", "DirectX", "Vulkan",
        "Metal", "WebGL", "Game Design", "Level Design", "3D Modeling", "Animation",
        "Shader Programming", "Physics Simulation", "AI for Games", "Multiplayer Networking"
    ]
    
    # AI & Machine Learning
    AI_ML = [
        "Artificial Intelligence", "Machine Learning", "Deep Learning", "Neural Networks",
        "Convolutional Neural Networks", "Recurrent Neural Networks", "Transformers",
        "Generative AI", "Large Language Models", "Computer Vision", "Natural Language Processing",
        "Reinforcement Learning", "Transfer Learning", "AutoML", "MLOps", "Model Deployment",
        "OpenAI API", "Hugging Face", "LangChain", "Vector Databases", "Embeddings",
        "Fine-tuning", "Prompt Engineering", "AI Ethics", "Explainable AI"
    ]
    
    # Blockchain & Web3
    BLOCKCHAIN = [
        "Blockchain Development", "Smart Contracts", "Solidity", "Ethereum", "Bitcoin",
        "Web3.js", "Ethers.js", "Truffle", "Hardhat", "Remix IDE", "MetaMask Integration",
        "DeFi", "NFTs", "DAOs", "Cryptocurrency", "Polygon", "Binance Smart Chain",
        "Avalanche", "Cardano", "Polkadot", "Chainlink", "IPFS", "Hyperledger Fabric"
    ]
    
    # Testing & Quality Assurance
    TESTING = [
        "Unit Testing", "Integration Testing", "End-to-End Testing", "Performance Testing",
        "Load Testing", "Security Testing", "Accessibility Testing", "Manual Testing",
        "Test Automation", "Selenium", "Cypress", "Playwright", "Jest", "Mocha", "Chai",
        "Jasmine", "Karma", "Protractor", "TestNG", "JUnit", "NUnit", "PyTest",
        "Postman", "Insomnia", "SoapUI", "JMeter", "LoadRunner", "Gatling"
    ]
    
    # System Administration
    SYSTEM_ADMIN = [
        "Linux Administration", "Windows Server", "macOS Server", "Network Administration",
        "DNS Management", "DHCP", "Active Directory", "LDAP", "Virtualization", "VMware",
        "Hyper-V", "VirtualBox", "Proxmox", "Storage Management", "Backup Solutions",
        "Disaster Recovery", "Monitoring", "Log Management", "Shell Scripting",
        "PowerShell", "Group Policy", "Certificate Management", "VPN Setup"
    ]
    
    # Design & UX
    DESIGN_UX = [
        "UI/UX Design", "User Research", "Wireframing", "Prototyping", "User Testing",
        "Information Architecture", "Interaction Design", "Visual Design", "Design Systems",
        "Accessibility Design", "Mobile Design", "Responsive Design", "Design Thinking",
        "Adobe Creative Suite", "Figma", "Sketch", "Adobe XD", "InVision", "Principle",
        "Framer", "Zeplin", "Marvel", "Balsamiq", "Axure RP", "Canva", "GIMP", "Inkscape"
    ]
    
    # Project Management & Methodologies
    PROJECT_MANAGEMENT = [
        "Agile Methodology", "Scrum", "Kanban", "Lean", "Waterfall", "DevOps", "GitOps",
        "Project Management", "Product Management", "Requirements Analysis", "Risk Management",
        "Stakeholder Management", "Team Leadership", "Technical Writing", "Documentation",
        "Jira", "Confluence", "Trello", "Asana", "Monday.com", "Notion", "Slack", "Microsoft Teams"
    ]
    
    # Emerging Technologies
    EMERGING_TECH = [
        "Internet of Things (IoT)", "Edge Computing", "Quantum Computing", "Augmented Reality",
        "Virtual Reality", "Mixed Reality", "5G Technology", "Robotics", "Automation",
        "Digital Twins", "Microservices", "Serverless Architecture", "Event-Driven Architecture",
        "API Design", "GraphQL", "gRPC", "WebAssembly", "Progressive Web Apps",
        "Headless CMS", "JAMstack", "Low-Code/No-Code", "RPA", "Voice Interfaces"
    ]
    
    @classmethod
    def get_all_skills(cls) -> List[str]:
        """Get all technical skills combined"""
        all_skills = []
        for category in [
            cls.PROGRAMMING_LANGUAGES, cls.WEB_DEVELOPMENT, cls.MOBILE_DEVELOPMENT,
            cls.DATABASES, cls.CLOUD_PLATFORMS, cls.DEVOPS, cls.DATA_SCIENCE,
            cls.CYBERSECURITY, cls.GAME_DEVELOPMENT, cls.AI_ML, cls.BLOCKCHAIN,
            cls.TESTING, cls.SYSTEM_ADMIN, cls.DESIGN_UX, cls.PROJECT_MANAGEMENT,
            cls.EMERGING_TECH
        ]:
            all_skills.extend(category)
        return sorted(list(set(all_skills)))  # Remove duplicates and sort
    
    @classmethod
    def get_skills_by_category(cls) -> Dict[str, List[str]]:
        """Get skills organized by category"""
        return {
            "Programming Languages": cls.PROGRAMMING_LANGUAGES,
            "Web Development": cls.WEB_DEVELOPMENT,
            "Mobile Development": cls.MOBILE_DEVELOPMENT,
            "Databases": cls.DATABASES,
            "Cloud Platforms": cls.CLOUD_PLATFORMS,
            "DevOps & Infrastructure": cls.DEVOPS,
            "Data Science & Analytics": cls.DATA_SCIENCE,
            "Cybersecurity": cls.CYBERSECURITY,
            "Game Development": cls.GAME_DEVELOPMENT,
            "AI & Machine Learning": cls.AI_ML,
            "Blockchain & Web3": cls.BLOCKCHAIN,
            "Testing & QA": cls.TESTING,
            "System Administration": cls.SYSTEM_ADMIN,
            "Design & UX": cls.DESIGN_UX,
            "Project Management": cls.PROJECT_MANAGEMENT,
            "Emerging Technologies": cls.EMERGING_TECH
        }
    
    @classmethod
    def search_skills(cls, query: str) -> List[str]:
        """Search for skills containing the query string"""
        all_skills = cls.get_all_skills()
        return [skill for skill in all_skills if query.lower() in skill.lower()]


class Feedback:
    def __init__(self, from_user: str, rating: int, comment: str):
        self.from_user = from_user
        self.rating = rating  # 1-5 stars
        self.comment = comment
        self.timestamp = datetime.datetime.now()


class User:
    def __init__(self, name: str, email: str, password: str):
        self.user_id = str(uuid.uuid4())
        self.name = name
        self.email = email
        self.password = password
        self.location: Optional[str] = None
        self.profile_photo_url: Optional[str] = None
        self.skills_offered: List[str] = []
        self.skills_wanted: List[str] = []
        self.availability: str = ""
        self.is_public: bool = True
        self.feedback: List[Feedback] = []
        self.is_banned: bool = False
        self.created_at = datetime.datetime.now()

    def add_feedback(self, from_user: str, rating: int, comment: str):
        """Add feedback from another user"""
        feedback = Feedback(from_user, rating, comment)
        self.feedback.append(feedback)

    def get_average_rating(self) -> float:
        """Calculate average rating from all feedback"""
        if not self.feedback:
            return 0.0
        return sum(f.rating for f in self.feedback) / len(self.feedback)

    def update_profile(self, **kwargs):
        """Update user profile with provided fields"""
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)

    def __str__(self):
        rating = self.get_average_rating()
        return f"{self.name} ({self.email}) - Rating: {rating:.1f}/5.0"


class Admin(User):
    def __init__(self, name: str, email: str, password: str):
        super().__init__(name, email, password)
        self.is_admin = True


class SwapRequest:
    def __init__(self, requester_id: str, recipient_id: str, offered_skill: str, 
                 requested_skill: str, message: str):
        self.request_id = str(uuid.uuid4())
        self.requester_id = requester_id
        self.recipient_id = recipient_id
        self.offered_skill = offered_skill
        self.requested_skill = requested_skill
        self.message = message
        self.status = RequestStatus.PENDING
        self.created_at = datetime.datetime.now()
        self.updated_at = datetime.datetime.now()

    def update_status(self, new_status: RequestStatus):
        """Update the status of the swap request"""
        self.status = new_status
        self.updated_at = datetime.datetime.now()

    def __str__(self):
        return f"Request: {self.offered_skill} ↔ {self.requested_skill} - Status: {self.status.value}"


class SkillSwapPlatform:
    def __init__(self):
        self.users: Dict[str, User] = {}  # email -> User
        self.swap_requests: List[SwapRequest] = []
        self.current_user: Optional[User] = None
        self.global_announcements: List[str] = []
        self.all_technical_skills = TechnicalSkills.get_all_skills()
        
        # Initialize with sample data
        self._create_sample_data()

    def _create_sample_data(self):
        """Create sample users with comprehensive technical skills"""
        # Get random skills for sample users
        all_skills = self.all_technical_skills
        
        users_data = [
            {
                "name": "Sakshi",
                "email": "sakshi@skillwise.in",
                "password": "password123",
                "location": "Mumbai, Maharashtra",
                "profile_photo_url": "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
                "skills_offered": random.sample([
                    "Python", "Machine Learning", "Django", "PostgreSQL", "AWS", 
                    "Docker", "React", "Data Analysis", "TensorFlow", "Git"
                ], 6),
                "skills_wanted": random.sample([
                    "Kubernetes", "Go", "Rust", "Blockchain Development", "Unity", 
                    "Cybersecurity", "GraphQL", "Vue.js", "MongoDB", "Azure"
                ], 5),
                "availability": "Weekends, Evenings",
            },
            {
                "name": "Yashpal",
                "email": "yashpal@skillwise.in",
                "password": "password123",
                "location": "Bangalore, Karnataka",
                "profile_photo_url": "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg",
                "skills_offered": random.sample([
                    "JavaScript", "TypeScript", "React", "Node.js", "GraphQL", 
                    "MongoDB", "Docker", "Kubernetes", "AWS", "Jest"
                ], 7),
                "skills_wanted": random.sample([
                    "Python", "Machine Learning", "Data Science", "TensorFlow", 
                    "Rust", "Blockchain Development", "Solidity", "WebAssembly"
                ], 4),
                "availability": "Weekdays, Mornings",
            },
            {
                "name": "Ayan",
                "email": "ayan@skillwise.in",
                "password": "password123",
                "location": "Delhi, NCR",
                "profile_photo_url": "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
                "skills_offered": random.sample([
                    "UI/UX Design", "Figma", "Adobe Creative Suite", "Prototyping", 
                    "User Research", "Design Systems", "Accessibility Design", "CSS3"
                ], 6),
                "skills_wanted": random.sample([
                    "React", "Vue.js", "JavaScript", "TypeScript", "Tailwind CSS", 
                    "Next.js", "Gatsby", "Svelte", "Web Development"
                ], 5),
                "availability": "Weekends, Afternoons",
            },
            {
                "name": "Akshay",
                "email": "akshay@skillwise.in",
                "password": "password123",
                "location": "Hyderabad, Telangana",
                "profile_photo_url": "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
                "skills_offered": random.sample([
                    "Java", "Spring Boot", "Microservices", "Apache Kafka", "Redis", 
                    "MySQL", "Jenkins", "GitLab CI/CD", "Terraform", "Monitoring"
                ], 7),
                "skills_wanted": random.sample([
                    "Go", "Rust", "Kubernetes", "Istio", "Prometheus", "Grafana", 
                    "Cloud Security", "DevSecOps", "Site Reliability Engineering"
                ], 4),
                "availability": "Weekdays, Evenings",
                "is_public": False,  # Private profile
            },
            {
                "name": "Tina",
                "email": "tina@skillwise.in",
                "password": "password123",
                "location": "Pune, Maharashtra",
                "profile_photo_url": "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
                "skills_offered": random.sample([
                    "Cybersecurity", "Penetration Testing", "Network Security", 
                    "Incident Response", "SIEM", "Vulnerability Assessment", 
                    "Ethical Hacking", "Digital Forensics", "Risk Assessment"
                ], 8),
                "skills_wanted": random.sample([
                    "Cloud Security", "AI Security", "Blockchain Security", 
                    "IoT Security", "Mobile Security", "DevSecOps"
                ], 3),
                "availability": "Weekends, Mornings",
            },
            {
                "name": "Shobhita",
                "email": "shobhita@skillwise.in",
                "password": "password123",
                "location": "Chennai, Tamil Nadu",
                "profile_photo_url": "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
                "skills_offered": random.sample([
                    "Unity", "C#", "Game Development", "3D Modeling", "Animation", 
                    "Shader Programming", "Physics Simulation", "Level Design", 
                    "Unreal Engine", "Blender"
                ], 8),
                "skills_wanted": random.sample([
                    "AI for Games", "Multiplayer Networking", "VR Development", 
                    "AR Development", "Mobile Game Development", "WebGL"
                ], 4),
                "availability": "Weekends, All Day",
            },
            {
                "name": "Lakshya",
                "email": "lakshya@skillwise.in",
                "password": "password123",
                "location": "Gurgaon, Haryana",
                "profile_photo_url": "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
                "skills_offered": random.sample([
                    "Data Science", "Python", "R", "Statistical Analysis", "Pandas", 
                    "NumPy", "Matplotlib", "Jupyter Notebooks", "SQL", "Tableau", 
                    "Power BI", "Apache Spark", "ETL Processes"
                ], 10),
                "skills_wanted": random.sample([
                    "MLOps", "Apache Airflow", "Kubernetes", "Docker", "AWS", 
                    "Google Cloud Platform", "Deep Learning", "Computer Vision"
                ], 5),
                "availability": "Weekdays, Afternoons",
            },
        ]

        for user_data in users_data:
            user = User(user_data["name"], user_data["email"], user_data["password"])
            user.update_profile(**{k: v for k, v in user_data.items() 
                                 if k not in ["name", "email", "password"]})
            self.users[user.email] = user

        # Create admin user
        admin = Admin("Platform Admin", "admin@skillwise.in", "admin123")
        admin.skills_offered = ["Platform Management", "User Support", "System Administration"]
        self.users[admin.email] = admin

        # Add sample feedback with technical context
        sakshi = self.users["sakshi@skillwise.in"]
        yashpal = self.users["yashpal@skillwise.in"]
        ayan = self.users["ayan@skillwise.in"]
        tina = self.users["tina@skillwise.in"]
        
        sakshi.add_feedback("yashpal@skillwise.in", 5, "Excellent Python and ML mentor! Helped me understand TensorFlow deeply.")
        sakshi.add_feedback("ayan@skillwise.in", 4, "Great Django tutorial, learned clean architecture patterns!")
        yashpal.add_feedback("sakshi@skillwise.in", 5, "Amazing React and TypeScript guidance, very thorough!")
        ayan.add_feedback("sakshi@skillwise.in", 4, "Helpful with PostgreSQL optimization, improved our app performance!")
        tina.add_feedback("sakshi@skillwise.in", 5, "Solid cybersecurity knowledge sharing, learned about secure coding practices!")

        # Create sample swap requests with technical skills
        request1 = SwapRequest(
            sakshi.user_id, yashpal.user_id,
            "Python", "JavaScript",
            "Hi Yashpal! I'd love to learn modern JavaScript/TypeScript from you. I can teach you Python and ML in return!"
        )
        request1.update_status(RequestStatus.ACCEPTED)
        
        request2 = SwapRequest(
            ayan.user_id, sakshi.user_id,
            "UI/UX Design", "Machine Learning",
            "Hello Sakshi! Would you be interested in learning UI/UX design? I need help understanding ML concepts."
        )
        
        request3 = SwapRequest(
            tina.user_id, yashpal.user_id,
            "Cybersecurity", "Node.js",
            "Hi Yashpal! I can teach you cybersecurity best practices. Could you help me with Node.js backend development?"
        )
        
        self.swap_requests.extend([request1, request2, request3])

    def register_user(self, name: str, email: str, password: str) -> bool:
        """Register a new user"""
        if email in self.users:
            print(f"❌ User with email {email} already exists!")
            return False
        
        user = User(name, email, password)
        self.users[email] = user
        print(f"✅ User {name} registered successfully!")
        return True

    def login(self, email: str, password: str) -> bool:
        """Authenticate user login"""
        if email not in self.users:
            print("❌ User not found!")
            return False
        
        user = self.users[email]
        if user.is_banned:
            print("❌ This account has been banned!")
            return False
            
        if user.password != password:
            print("❌ Invalid password!")
            return False
        
        self.current_user = user
        print(f"✅ Welcome back, {user.name}!")
        return True

    def logout(self):
        """Log out current user"""
        if self.current_user:
            print(f"👋 Goodbye, {self.current_user.name}!")
            self.current_user = None
        else:
            print("❌ No user is currently logged in.")

    def is_logged_in(self) -> bool:
        """Check if a user is logged in"""
        return self.current_user is not None

    def get_public_profiles(self, page: int = 1, page_size: int = 10) -> List[User]:
        """Get paginated list of public user profiles"""
        public_users = [user for user in self.users.values() 
                       if user.is_public and not user.is_banned and 
                       not isinstance(user, Admin)]
        
        start_idx = (page - 1) * page_size
        end_idx = start_idx + page_size
        return public_users[start_idx:end_idx]

    def search_users_by_skill(self, skill: str) -> List[User]:
        """Search users who offer a specific skill"""
        matching_users = []
        for user in self.users.values():
            if (user.is_public and not user.is_banned and 
                not isinstance(user, Admin) and
                any(skill.lower() in offered_skill.lower() 
                    for offered_skill in user.skills_offered)):
                matching_users.append(user)
        return matching_users

    def search_skills(self, query: str) -> List[str]:
        """Search available technical skills"""
        return TechnicalSkills.search_skills(query)

    def get_skills_by_category(self) -> Dict[str, List[str]]:
        """Get all skills organized by category"""
        return TechnicalSkills.get_skills_by_category()

    def search_users_by_availability(self, availability: str) -> List[User]:
        """Search users by availability"""
        matching_users = []
        for user in self.users.values():
            if (user.is_public and not user.is_banned and 
                not isinstance(user, Admin) and
                availability.lower() in user.availability.lower()):
                matching_users.append(user)
        return matching_users

    def create_swap_request(self, recipient_email: str, offered_skill: str, 
                           requested_skill: str, message: str) -> bool:
        """Create a new swap request"""
        if not self.is_logged_in():
            print("❌ You must be logged in to send swap requests!")
            return False

        if recipient_email not in self.users:
            print("❌ Recipient user not found!")
            return False

        recipient = self.users[recipient_email]
        if recipient.is_banned:
            print("❌ Cannot send request to banned user!")
            return False

        # Validate offered skill
        if offered_skill not in self.current_user.skills_offered:
            print(f"❌ You don't offer the skill: {offered_skill}")
            return False

        # Validate requested skill
        if requested_skill not in recipient.skills_offered:
            print(f"❌ {recipient.name} doesn't offer the skill: {requested_skill}")
            return False

        swap_request = SwapRequest(
            self.current_user.user_id, recipient.user_id,
            offered_skill, requested_skill, message
        )
        self.swap_requests.append(swap_request)
        
        print(f"✅ Swap request sent to {recipient.name}!")
        return True

    def get_user_requests(self, user_id: str) -> Tuple[List[SwapRequest], List[SwapRequest]]:
        """Get incoming and outgoing requests for a user"""
        incoming = [req for req in self.swap_requests if req.recipient_id == user_id]
        outgoing = [req for req in self.swap_requests if req.requester_id == user_id]
        return incoming, outgoing

    def respond_to_request(self, request_id: str, accept: bool) -> bool:
        """Accept or reject a swap request"""
        if not self.is_logged_in():
            print("❌ You must be logged in!")
            return False

        request = next((req for req in self.swap_requests if req.request_id == request_id), None)
        if not request:
            print("❌ Request not found!")
            return False

        if request.recipient_id != self.current_user.user_id:
            print("❌ You can only respond to requests sent to you!")
            return False

        new_status = RequestStatus.ACCEPTED if accept else RequestStatus.REJECTED
        request.update_status(new_status)
        
        action = "accepted" if accept else "rejected"
        print(f"✅ Request {action} successfully!")
        return True

    def leave_feedback(self, target_email: str, rating: int, comment: str) -> bool:
        """Leave feedback for another user"""
        if not self.is_logged_in():
            print("❌ You must be logged in to leave feedback!")
            return False

        if target_email not in self.users:
            print("❌ Target user not found!")
            return False

        if rating < 1 or rating > 5:
            print("❌ Rating must be between 1 and 5!")
            return False

        target_user = self.users[target_email]
        target_user.add_feedback(self.current_user.email, rating, comment)
        
        print(f"✅ Feedback left for {target_user.name}!")
        return True

    def display_skills_catalog(self):
        """Display comprehensive technical skills catalog"""
        print("\n" + "="*80)
        print("🛠️  COMPREHENSIVE TECHNICAL SKILLS CATALOG")
        print("="*80)
        
        skills_by_category = self.get_skills_by_category()
        
        for category, skills in skills_by_category.items():
            print(f"\n📂 {category.upper()} ({len(skills)} skills)")
            print("-" * 60)
            
            # Display skills in columns for better readability
            for i in range(0, len(skills), 3):
                row_skills = skills[i:i+3]
                formatted_skills = [f"{skill:<25}" for skill in row_skills]
                print("   " + " | ".join(formatted_skills))
        
        print(f"\n📊 TOTAL SKILLS AVAILABLE: {len(self.all_technical_skills)}")

    def display_home_page(self):
        """Display the home page with public profiles"""
        print("\n" + "="*80)
        print("🏠 SKILL SWAP PLATFORM - HOME PAGE")
        print("="*80)
        
        public_profiles = self.get_public_profiles()
        
        if not public_profiles:
            print("No public profiles available.")
            return

        for user in public_profiles:
            print(f"\n📋 {user.name}")
            if user.location:
                print(f"   📍 Location: {user.location}")
            print(f"   ⭐ Rating: {user.get_average_rating():.1f}/5.0 ({len(user.feedback)} reviews)")
            
            # Display skills in a more organized way
            offered_skills = user.skills_offered[:5]  # Show first 5
            wanted_skills = user.skills_wanted[:5]    # Show first 5
            
            print(f"   💡 Offers: {', '.join(offered_skills)}")
            if len(user.skills_offered) > 5:
                print(f"      ... and {len(user.skills_offered) - 5} more")
                
            print(f"   🎯 Wants: {', '.join(wanted_skills)}")
            if len(user.skills_wanted) > 5:
                print(f"      ... and {len(user.skills_wanted) - 5} more")
                
            print(f"   ⏰ Available: {user.availability}")
            
            if self.is_logged_in() and user.email != self.current_user.email:
                print(f"   ➡️  Send request: contact {user.email}")
            print("-" * 60)

    def display_user_profile(self, email: str = None):
        """Display user profile"""
        if email is None:
            if not self.is_logged_in():
                print("❌ Please log in or specify an email!")
                return
            user = self.current_user
        else:
            if email not in self.users:
                print("❌ User not found!")
                return
            user = self.users[email]

        print(f"\n👤 PROFILE: {user.name}")
        print("="*50)
        print(f"Email: {user.email}")
        if user.location:
            print(f"Location: {user.location}")
        print(f"Profile: {'Public' if user.is_public else 'Private'}")
        
        print(f"\n💡 SKILLS OFFERED ({len(user.skills_offered)}):")
        if user.skills_offered:
            for i, skill in enumerate(user.skills_offered, 1):
                print(f"   {i}. {skill}")
        else:
            print("   None specified")
            
        print(f"\n🎯 SKILLS WANTED ({len(user.skills_wanted)}):")
        if user.skills_wanted:
            for i, skill in enumerate(user.skills_wanted, 1):
                print(f"   {i}. {skill}")
        else:
            print("   None specified")
            
        print(f"\n⏰ Availability: {user.availability if user.availability else 'Not specified'}")
        print(f"⭐ Rating: {user.get_average_rating():.1f}/5.0 ({len(user.feedback)} reviews)")
        
        if user.feedback:
            print("\n💬 Recent Feedback:")
            for feedback in user.feedback[-3:]:  # Show last 3 reviews
                print(f"   ⭐ {feedback.rating}/5 - {feedback.comment}")

    def display_swap_requests(self):
        """Display user's swap requests"""
        if not self.is_logged_in():
            print("❌ Please log in first!")
            return

        incoming, outgoing = self.get_user_requests(self.current_user.user_id)
        
        print(f"\n📨 YOUR SWAP REQUESTS")
        print("="*50)
        
        print(f"\n📥 INCOMING REQUESTS ({len(incoming)}):")
        if not incoming:
            print("   No incoming requests.")
        else:
            for req in incoming:
                requester = next((u for u in self.users.values() if u.user_id == req.requester_id), None)
                if requester:
                    print(f"   From: {requester.name}")
                    print(f"   Offering: {req.offered_skill} → Wants: {req.requested_skill}")
                    print(f"   Message: {req.message}")
                    print(f"   Status: {req.status.value}")
                    print(f"   Request ID: {req.request_id}")
                    print("   " + "-"*40)

        print(f"\n📤 OUTGOING REQUESTS ({len(outgoing)}):")
        if not outgoing:
            print("   No outgoing requests.")
        else:
            for req in outgoing:
                recipient = next((u for u in self.users.values() if u.user_id == req.recipient_id), None)
                if recipient:
                    print(f"   To: {recipient.name}")
                    print(f"   Offering: {req.offered_skill} → Wants: {req.requested_skill}")
                    print(f"   Message: {req.message}")
                    print(f"   Status: {req.status.value}")
                    print("   " + "-"*40)

    # Admin Functions
    def admin_view_all_requests(self):
        """Admin function to view all swap requests"""
        if not self.is_logged_in() or not isinstance(self.current_user, Admin):
            print("❌ Admin access required!")
            return

        print(f"\n🔧 ADMIN PANEL - ALL SWAP REQUESTS ({len(self.swap_requests)})")
        print("="*70)
        
        for req in self.swap_requests:
            requester = next((u for u in self.users.values() if u.user_id == req.requester_id), None)
            recipient = next((u for u in self.users.values() if u.user_id == req.recipient_id), None)
            
            if requester and recipient:
                print(f"Request ID: {req.request_id}")
                print(f"From: {requester.name} ({requester.email})")
                print(f"To: {recipient.name} ({recipient.email})")
                print(f"Skill Swap: {req.offered_skill} ↔ {req.requested_skill}")
                print(f"Status: {req.status.value}")
                print(f"Created: {req.created_at.strftime('%Y-%m-%d %H:%M')}")
                print("-" * 60)

    def admin_ban_user(self, email: str):
        """Admin function to ban a user"""
        if not self.is_logged_in() or not isinstance(self.current_user, Admin):
            print("❌ Admin access required!")
            return

        if email not in self.users:
            print("❌ User not found!")
            return

        user = self.users[email]
        user.is_banned = True
        print(f"✅ User {user.name} has been banned.")

    def admin_send_announcement(self, message: str):
        """Admin function to send global announcement"""
        if not self.is_logged_in() or not isinstance(self.current_user, Admin):
            print("❌ Admin access required!")
            return

        self.global_announcements.append(f"[{datetime.datetime.now().strftime('%Y-%m-%d %H:%M')}] {message}")
        print(f"📢 GLOBAL ANNOUNCEMENT: {message}")

    def admin_generate_report(self):
        """Admin function to generate platform report"""
        if not self.is_logged_in() or not isinstance(self.current_user, Admin):
            print("❌ Admin access required!")
            return

        total_users = len([u for u in self.users.values() if not isinstance(u, Admin)])
        banned_users = len([u for u in self.users.values() if u.is_banned])
        total_requests = len(self.swap_requests)
        accepted_requests = len([r for r in self.swap_requests if r.status == RequestStatus.ACCEPTED])
        pending_requests = len([r for r in self.swap_requests if r.status == RequestStatus.PENDING])
        
        # Skills analytics
        all_offered_skills = []
        all_wanted_skills = []
        for user in self.users.values():
            if not isinstance(user, Admin):
                all_offered_skills.extend(user.skills_offered)
                all_wanted_skills.extend(user.skills_wanted)
        
        from collections import Counter
        top_offered = Counter(all_offered_skills).most_common(5)
        top_wanted = Counter(all_wanted_skills).most_common(5)
        
        print(f"\n📊 COMPREHENSIVE PLATFORM REPORT")
        print("="*50)
        print(f"Total Users: {total_users}")
        print(f"Banned Users: {banned_users}")
        print(f"Total Swap Requests: {total_requests}")
        print(f"Accepted Requests: {accepted_requests}")
        print(f"Pending Requests: {pending_requests}")
        print(f"Total Feedback Reviews: {sum(len(u.feedback) for u in self.users.values())}")
        print(f"Available Technical Skills: {len(self.all_technical_skills)}")
        
        print(f"\n🔥 TOP 5 MOST OFFERED SKILLS:")
        for skill, count in top_offered:
            print(f"   {skill}: {count} users")
            
        print(f"\n🎯 TOP 5 MOST WANTED SKILLS:")
        for skill, count in top_wanted:
            print(f"   {skill}: {count} users")


def demonstrate_comprehensive_platform():
    """Demonstrate Skill Wise platform with comprehensive technical skills for Indian professionals"""
    platform = SkillSwapPlatform()
    
    print("🎯 SKILL WISE - COMPREHENSIVE INDIAN SKILL SWAP PLATFORM DEMONSTRATION")
    print("="*80)
    
    # Show skills catalog
    print("\n1️⃣  Displaying comprehensive technical skills catalog for Indian professionals:")
    platform.display_skills_catalog()
    
    # Show home page (not logged in)
    print("\n2️⃣  Browsing Skill Wise home page with Indian technical professionals:")
    platform.display_home_page()
    
    # Login as Sakshi
    print("\n3️⃣  Logging in as Sakshi (ML/Python expert from Mumbai):")
    platform.login("sakshi@skillwise.in", "password123")
    
    # View profile
    print("\n4️⃣  Viewing Sakshi's technical profile:")
    platform.display_user_profile()
    
    # Search for users with specific technical skills
    print("\n5️⃣  Searching for users with 'JavaScript' skills:")
    js_developers = platform.search_users_by_skill("JavaScript")
    for user in js_developers:
        print(f"   Found: {user.name} - {user.email}")
        print(f"   Offers: {', '.join(user.skills_offered[:3])}...")
    
    # Search for blockchain developers
    print("\n6️⃣  Searching for 'Blockchain' experts:")
    blockchain_devs = platform.search_users_by_skill("Blockchain")
    for user in blockchain_devs:
        print(f"   Found: {user.name} - {user.email}")
        print(f"   Offers: {', '.join(user.skills_offered[:3])}...")
    
    # Send a technical swap request
    print("\n7️⃣  Sakshi (Mumbai) sending a swap request to Yashpal (Bangalore JS/TS expert):")
    platform.create_swap_request(
        "yashpal@skillwise.in",
        "Python",
        "JavaScript",
        "Hi Yashpal! I'd love to learn modern JavaScript/TypeScript and React from you. I can teach you Python, ML, and data science in return!"
    )
    
    # View swap requests
    print("\n8️⃣  Viewing Sakshi's technical swap requests:")
    platform.display_swap_requests()
    
    # Login as Yashpal to respond to request
    print("\n9️⃣  Switching to Yashpal's account (Full-stack developer from Bangalore):")
    platform.logout()
    platform.login("yashpal@skillwise.in", "password123")
    
    # View Yashpal's profile
    print("\n🔟 Viewing Yashpal's technical profile:")
    platform.display_user_profile()
    
    # Yashpal accepts a request
    if platform.swap_requests:
        latest_request = platform.swap_requests[-1]
        print(f"\n1️⃣1️⃣ Yashpal accepting technical skill swap request:")
        platform.respond_to_request(latest_request.request_id, True)
    
    # Leave technical feedback
    print("\n1️⃣2️⃣ Yashpal leaving technical feedback for Sakshi:")
    platform.leave_feedback("sakshi@skillwise.in", 5, "Excellent Python and ML mentor! Sakshi helped me understand TensorFlow, pandas, and scikit-learn. Her explanations of neural networks were crystal clear!")
    
    # Search for specific skills
    print("\n1️⃣3️⃣ Searching for 'Cybersecurity' in skill catalog:")
    cyber_skills = platform.search_skills("Cybersecurity")
    print(f"   Found {len(cyber_skills)} cybersecurity-related skills:")
    for skill in cyber_skills[:5]:  # Show first 5
        print(f"   • {skill}")
    
    # Admin demonstration
    print("\n🔧 ADMIN DEMONSTRATION:")
    platform.logout()
    platform.login("admin@skillwise.in", "admin123")
    
    print("\n📋 Admin viewing all technical swap requests:")
    platform.admin_view_all_requests()
    
    print("\n📢 Admin sending technical announcement:")
    platform.admin_send_announcement("🇮🇳 Welcome to Skill Wise! New AI/ML and Blockchain skill categories added for Indian tech professionals. Check out our expanded technical skills catalog.")
    
    print("\n📊 Admin generating comprehensive technical report:")
    platform.admin_generate_report()
    
    print("\n✅ SKILL WISE DEMONSTRATION COMPLETE!")
    print("🇮🇳 Skill Wise platform now includes:")
    print("• 300+ technical skills across 16 categories")
    print("• Programming languages, frameworks, tools, and methodologies")
    print("• AI/ML, Blockchain, Cybersecurity, Game Development, and more")
    print("• Advanced search and filtering capabilities")
    print("• Technical skill matching and swap requests")
    print("• Comprehensive analytics and reporting")
    print("• Professional technical profiles and feedback for Indian professionals")
    print("• Indian cities: Mumbai, Bangalore, Delhi, Hyderabad, Pune, Chennai, Gurgaon")


if __name__ == "__main__":
    demonstrate_comprehensive_platform()
    
    # Interactive mode
    print("\n" + "="*80)
    print("🎮 INTERACTIVE MODE - SKILL WISE PLATFORM")
    print("="*80)
    print("🇮🇳 Skill Wise is ready with comprehensive technical skills for Indian professionals!")
    print(f"Total skills available: {len(TechnicalSkills.get_all_skills())}")
    print("\nExample commands:")
    print("platform = SkillSwapPlatform()")
    print("platform.display_skills_catalog()")
    print("platform.search_skills('Python')")
    print("platform.login('sakshi@skillwise.in', 'password123')")
    print("platform.search_users_by_skill('Machine Learning')")