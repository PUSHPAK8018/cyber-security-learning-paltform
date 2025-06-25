import { Specialization, Mission, Achievement, InventoryItem } from '../types/game';

export const specializations: Specialization[] = [
  {
    id: 'network-security',
    name: 'Network Security Analyst',
    description: 'Protect networks from intrusions, configure firewalls, and monitor traffic',
    icon: 'shield',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'penetration-testing',
    name: 'Penetration Tester',
    description: 'Ethical hacking to identify vulnerabilities before malicious actors do',
    icon: 'zap',
    color: 'from-green-500 to-emerald-400'
  },
  {
    id: 'digital-forensics',
    name: 'Digital Forensics Investigator',
    description: 'Analyze digital evidence, recover data, and investigate cyber crimes',
    icon: 'search',
    color: 'from-purple-500 to-violet-400'
  },
  {
    id: 'incident-response',
    name: 'Incident Response Specialist',
    description: 'Rapid response to security breaches, containment, and recovery',
    icon: 'siren',
    color: 'from-red-500 to-orange-400'
  },
  {
    id: 'cryptography',
    name: 'Cryptography Engineer',
    description: 'Design and implement encryption systems and secure protocols',
    icon: 'key',
    color: 'from-yellow-500 to-amber-400'
  },
  {
    id: 'security-awareness',
    name: 'Security Awareness Trainer',
    description: 'Educate users about social engineering and security best practices',
    icon: 'users',
    color: 'from-pink-500 to-rose-400'
  },
  {
    id: 'compliance-auditor',
    name: 'Compliance & Risk Auditor',
    description: 'Ensure adherence to regulations like GDPR, HIPAA, and SOX',
    icon: 'clipboard-check',
    color: 'from-indigo-500 to-blue-400'
  },
  {
    id: 'malware-analyst',
    name: 'Malware Analyst',
    description: 'Reverse engineer malware, analyze threats, and develop countermeasures',
    icon: 'bug',
    color: 'from-teal-500 to-cyan-400'
  }
];

export const missions: Mission[] = [
  {
    id: 'email-phishing-analysis',
    title: 'Corporate Email Threat Analysis',
    description: 'Analyze suspicious emails targeting employees at TechCorp Industries',
    type: 'challenge',
    difficulty: 'beginner',
    specialization: 'security-awareness',
    xpReward: 150,
    requirements: [],
    scenario: {
      setting: 'TechCorp Industries - IT Security Department',
      situation: 'The HR department has forwarded 5 suspicious emails received by employees. You need to analyze each email for phishing indicators and recommend appropriate actions.',
      objectives: [
        'Examine email headers for spoofing indicators',
        'Analyze URLs and attachments for malicious content',
        'Identify social engineering techniques used',
        'Recommend security awareness training topics'
      ],
      choices: [
        {
          id: 'header-analysis',
          text: 'Analyze the email headers for SPF, DKIM, and DMARC authentication',
          consequence: 'You discover the email failed SPF authentication - the sending server is not authorized',
          correctness: 'correct',
          xpGain: 75,
          explanation: 'Email authentication protocols (SPF, DKIM, DMARC) are crucial for identifying spoofed emails'
        },
        {
          id: 'url-sandbox',
          text: 'Submit suspicious URLs to a sandbox environment for analysis',
          consequence: 'The sandbox reveals the URL redirects to a credential harvesting site',
          correctness: 'correct',
          xpGain: 80,
          explanation: 'Sandboxing allows safe analysis of potentially malicious URLs without risking infection'
        },
        {
          id: 'immediate-block',
          text: 'Immediately block the sender domain company-wide',
          consequence: 'Good defensive action, but you should analyze the threat first for better understanding',
          correctness: 'partially',
          xpGain: 40,
          explanation: 'While blocking is important, analysis helps understand the attack vector for better future defense'
        }
      ]
    }
  },
  {
    id: 'network-intrusion-detection',
    title: 'Advanced Persistent Threat Detection',
    description: 'Investigate suspicious network activity indicating a possible APT infiltration',
    type: 'simulation',
    difficulty: 'intermediate',
    specialization: 'network-security',
    xpReward: 300,
    requirements: ['Complete Corporate Email Threat Analysis'],
    scenario: {
      setting: 'SecureBank Network Operations Center',
      situation: 'Your SIEM has detected unusual patterns: encrypted traffic to known C2 servers, lateral movement between internal systems, and data exfiltration attempts during off-hours.',
      objectives: [
        'Analyze network logs for indicators of compromise (IoCs)',
        'Identify the initial attack vector and timeline',
        'Map the extent of lateral movement within the network',
        'Implement containment without alerting the attackers'
      ],
      choices: [
        {
          id: 'traffic-analysis',
          text: 'Perform deep packet inspection on the suspicious encrypted traffic',
          consequence: 'You identify DNS tunneling being used for data exfiltration - classic APT technique',
          correctness: 'correct',
          xpGain: 90,
          explanation: 'DNS tunneling is a common technique used by APTs to bypass traditional security controls'
        },
        {
          id: 'isolate-systems',
          text: 'Immediately isolate all affected systems from the network',
          consequence: 'This alerts the attackers and they activate their scorched earth protocol',
          correctness: 'incorrect',
          xpGain: 20,
          explanation: 'Immediate isolation can alert sophisticated attackers; stealth monitoring is often better initially'
        },
        {
          id: 'threat-hunting',
          text: 'Deploy threat hunting techniques to map the full attack infrastructure',
          consequence: 'You discover the attack has been ongoing for 3 months with multiple compromised systems',
          correctness: 'correct',
          xpGain: 100,
          explanation: 'Proactive threat hunting helps understand the full scope before taking containment actions'
        }
      ]
    }
  },
  {
    id: 'ransomware-incident-response',
    title: 'WannaCry-Style Ransomware Outbreak',
    description: 'Lead incident response for a major ransomware attack affecting critical infrastructure',
    type: 'story',
    difficulty: 'advanced',
    specialization: 'incident-response',
    xpReward: 500,
    requirements: ['Complete APT Detection', 'Network Security Level 5'],
    scenario: {
      setting: 'Regional Hospital Network - Emergency Response Center',
      situation: 'At 3 AM, ransomware has encrypted patient records across 12 hospitals. Medical devices are affected, surgeries are postponed, and the attackers demand $5 million in Bitcoin within 72 hours.',
      objectives: [
        'Assess impact on patient safety and critical systems',
        'Coordinate with legal, executive, and medical teams',
        'Evaluate backup integrity and recovery options',
        'Manage public communications and regulatory reporting'
      ],
      choices: [
        {
          id: 'backup-assessment',
          text: 'Immediately assess backup systems and air-gapped recovery options',
          consequence: 'You find recent backups for 80% of systems, but some critical patient monitoring systems need manual recovery',
          correctness: 'correct',
          xpGain: 120,
          explanation: 'Backup assessment is critical for recovery planning and avoiding ransom payment'
        },
        {
          id: 'fbi-notification',
          text: 'Contact FBI Cyber Division and healthcare regulators immediately',
          consequence: 'FBI provides threat intelligence and helps coordinate with other affected organizations',
          correctness: 'correct',
          xpGain: 100,
          explanation: 'Law enforcement notification is required and provides valuable resources and intelligence'
        },
        {
          id: 'ransom-payment',
          text: 'Recommend immediate ransom payment to restore patient care systems',
          consequence: 'Payment funds criminal operations and doesn\'t guarantee full recovery - some systems remain encrypted',
          correctness: 'incorrect',
          xpGain: 0,
          explanation: 'Ransom payments encourage more attacks and don\'t guarantee recovery; focus on backup restoration'
        }
      ]
    }
  },
  {
    id: 'supply-chain-attack',
    title: 'SolarWinds-Style Supply Chain Compromise',
    description: 'Investigate a sophisticated supply chain attack affecting your organization\'s software',
    type: 'simulation',
    difficulty: 'expert',
    specialization: 'malware-analyst',
    xpReward: 750,
    requirements: ['Complete Ransomware Response', 'Malware Analysis Level 7'],
    scenario: {
      setting: 'Fortune 500 Company - Advanced Threat Research Lab',
      situation: 'Your security vendor has notified you that a software update you deployed contains a backdoor. The malware has been active for 6 months and may have accessed sensitive customer data.',
      objectives: [
        'Analyze the malicious code and its capabilities',
        'Determine what data may have been compromised',
        'Assess the scope of the supply chain compromise',
        'Coordinate with vendors and customers on remediation'
      ],
      choices: [
        {
          id: 'malware-reverse-engineering',
          text: 'Reverse engineer the malicious code to understand its full capabilities',
          consequence: 'You discover it\'s a sophisticated RAT with data exfiltration and lateral movement capabilities',
          correctness: 'correct',
          xpGain: 150,
          explanation: 'Understanding malware capabilities is crucial for assessing impact and planning remediation'
        },
        {
          id: 'network-forensics',
          text: 'Analyze 6 months of network logs for indicators of data exfiltration',
          consequence: 'You find evidence of customer database access and encrypted data transfers to external servers',
          correctness: 'correct',
          xpGain: 140,
          explanation: 'Historical analysis helps determine the full scope of compromise and regulatory obligations'
        },
        {
          id: 'immediate-disclosure',
          text: 'Immediately disclose the breach to all customers and regulators',
          consequence: 'Premature disclosure without full impact assessment causes unnecessary panic and regulatory issues',
          correctness: 'partially',
          xpGain: 60,
          explanation: 'While transparency is important, complete impact assessment should precede disclosure when possible'
        }
      ]
    }
  },
  {
    id: 'cloud-security-misconfiguration',
    title: 'AWS S3 Bucket Data Exposure',
    description: 'Respond to a misconfigured cloud storage bucket exposing sensitive customer data',
    type: 'challenge',
    difficulty: 'intermediate',
    specialization: 'compliance-auditor',
    xpReward: 250,
    requirements: ['Complete Email Threat Analysis'],
    scenario: {
      setting: 'E-commerce Platform - Cloud Security Team',
      situation: 'A security researcher has contacted you about an open S3 bucket containing customer PII, payment data, and internal documents. The bucket has been publicly accessible for 2 weeks.',
      objectives: [
        'Immediately secure the exposed data',
        'Assess what data was accessed and by whom',
        'Determine regulatory notification requirements',
        'Implement preventive controls for future incidents'
      ],
      choices: [
        {
          id: 'immediate-remediation',
          text: 'Immediately restrict bucket access and enable logging',
          consequence: 'Data is secured, but you need to analyze access logs to determine if data was downloaded',
          correctness: 'correct',
          xpGain: 80,
          explanation: 'Immediate containment is critical, but forensic analysis is needed to assess impact'
        },
        {
          id: 'access-log-analysis',
          text: 'Analyze CloudTrail and S3 access logs for unauthorized downloads',
          consequence: 'You find evidence of automated scraping tools accessing the bucket multiple times',
          correctness: 'correct',
          xpGain: 90,
          explanation: 'Log analysis helps determine the scope of exposure and regulatory notification requirements'
        },
        {
          id: 'delay-notification',
          text: 'Delay regulatory notification until you fully understand the impact',
          consequence: 'GDPR requires notification within 72 hours - delays can result in significant fines',
          correctness: 'incorrect',
          xpGain: 10,
          explanation: 'Most regulations require prompt notification; delays can result in additional penalties'
        }
      ]
    }
  },
  {
    id: 'insider-threat-investigation',
    title: 'Privileged User Data Theft Investigation',
    description: 'Investigate suspicious activity by a privileged user with access to sensitive systems',
    type: 'story',
    difficulty: 'advanced',
    specialization: 'digital-forensics',
    xpReward: 400,
    requirements: ['Complete Cloud Security Incident', 'Digital Forensics Level 6'],
    scenario: {
      setting: 'Defense Contractor - Digital Forensics Lab',
      situation: 'HR has reported that a senior database administrator is leaving for a competitor. Unusual database queries and large file transfers have been detected from their account during off-hours.',
      objectives: [
        'Analyze user activity logs and database access patterns',
        'Preserve digital evidence following legal standards',
        'Determine what data may have been exfiltrated',
        'Coordinate with legal and HR teams on response'
      ],
      choices: [
        {
          id: 'forensic-imaging',
          text: 'Create forensic images of the user\'s workstation and analyze file system artifacts',
          consequence: 'You discover deleted files containing customer lists and proprietary algorithms',
          correctness: 'correct',
          xpGain: 110,
          explanation: 'Proper forensic imaging preserves evidence and can reveal deleted or hidden data'
        },
        {
          id: 'database-audit',
          text: 'Analyze database audit logs for unusual query patterns and data access',
          consequence: 'You find evidence of bulk data extraction queries targeting customer and financial data',
          correctness: 'correct',
          xpGain: 100,
          explanation: 'Database audit logs are crucial for understanding what data was accessed by insider threats'
        },
        {
          id: 'confront-user',
          text: 'Immediately confront the user about the suspicious activity',
          consequence: 'This alerts them to the investigation and they may destroy evidence or accelerate data theft',
          correctness: 'incorrect',
          xpGain: 20,
          explanation: 'Confronting suspects before evidence collection can compromise the investigation'
        }
      ]
    }
  }
];

export const achievements: Achievement[] = [
  {
    id: 'first-mission',
    title: 'Cyber Guardian Initiate',
    description: 'Complete your first cybersecurity mission',
    icon: 'award',
    rarity: 'common'
  },
  {
    id: 'phishing-expert',
    title: 'Phishing Detection Expert',
    description: 'Successfully identify and analyze 25 phishing attempts',
    icon: 'shield-check',
    rarity: 'rare'
  },
  {
    id: 'incident-commander',
    title: 'Incident Response Commander',
    description: 'Successfully lead 10 major incident response scenarios',
    icon: 'crown',
    rarity: 'epic'
  },
  {
    id: 'threat-hunter',
    title: 'Advanced Threat Hunter',
    description: 'Discover and analyze 5 advanced persistent threats',
    icon: 'crosshair',
    rarity: 'epic'
  },
  {
    id: 'forensics-master',
    title: 'Digital Forensics Master',
    description: 'Complete 15 digital forensics investigations with perfect scores',
    icon: 'microscope',
    rarity: 'legendary'
  },
  {
    id: 'compliance-guru',
    title: 'Compliance & Risk Guru',
    description: 'Achieve perfect compliance scores across GDPR, HIPAA, and SOX scenarios',
    icon: 'clipboard-check',
    rarity: 'legendary'
  },
  {
    id: 'malware-nemesis',
    title: 'Malware Nemesis',
    description: 'Successfully reverse engineer and neutralize 20 malware samples',
    icon: 'bug-off',
    rarity: 'legendary'
  }
];

export const inventoryItems: InventoryItem[] = [
  {
    id: 'wireshark-pro',
    name: 'Wireshark Network Protocol Analyzer',
    type: 'tool',
    description: 'Advanced packet capture and network traffic analysis',
    icon: 'network',
    rarity: 'common'
  },
  {
    id: 'nmap-scanner',
    name: 'Nmap Network Scanner',
    type: 'tool',
    description: 'Network discovery and security auditing tool',
    icon: 'radar',
    rarity: 'common'
  },
  {
    id: 'metasploit-framework',
    name: 'Metasploit Penetration Testing Framework',
    type: 'tool',
    description: 'Comprehensive penetration testing and exploit development platform',
    icon: 'zap',
    rarity: 'rare'
  },
  {
    id: 'volatility-memory',
    name: 'Volatility Memory Forensics Framework',
    type: 'tool',
    description: 'Advanced memory dump analysis for digital forensics',
    icon: 'cpu',
    rarity: 'rare'
  },
  {
    id: 'cissp-certification',
    name: 'CISSP Certification',
    type: 'certification',
    description: 'Certified Information Systems Security Professional',
    icon: 'certificate',
    rarity: 'epic'
  },
  {
    id: 'ceh-certification',
    name: 'CEH Certification',
    type: 'certification',
    description: 'Certified Ethical Hacker credential',
    icon: 'shield-check',
    rarity: 'rare'
  },
  {
    id: 'gcih-certification',
    name: 'GCIH Certification',
    type: 'certification',
    description: 'GIAC Certified Incident Handler',
    icon: 'siren',
    rarity: 'epic'
  },
  {
    id: 'zero-day-knowledge',
    name: 'Zero-Day Vulnerability Intelligence',
    type: 'knowledge',
    description: 'Advanced knowledge of undisclosed security vulnerabilities',
    icon: 'eye',
    rarity: 'legendary'
  },
  {
    id: 'apt-tactics',
    name: 'APT Tactics & Techniques Manual',
    type: 'knowledge',
    description: 'Comprehensive understanding of Advanced Persistent Threat methodologies',
    icon: 'book-open',
    rarity: 'epic'
  },
  {
    id: 'compliance-frameworks',
    name: 'Regulatory Compliance Frameworks',
    type: 'knowledge',
    description: 'Expert knowledge of GDPR, HIPAA, SOX, and PCI-DSS requirements',
    icon: 'clipboard-list',
    rarity: 'rare'
  }
];

export const defaultPlayer = {
  id: 'player-1',
  name: 'Cyber Guardian',
  level: 1,
  xp: 0,
  xpToNext: 200,
  specialization: specializations[0],
  stats: {
    networkSecurity: 15,
    digitalForensics: 10,
    ethicalHacking: 12,
    incidentResponse: 8,
    cryptography: 6,
    socialEngineering: 14,
    compliance: 5,
    malwareAnalysis: 7
  },
  inventory: [inventoryItems[0], inventoryItems[1]],
  achievements: [],
  completedMissions: []
};