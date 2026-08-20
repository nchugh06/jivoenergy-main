'use client';

import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, type Variants } from 'framer-motion';
import {
	Briefcase,
	Users,
	TrendingUp,
	Award,
	Heart,
	Shield,
	Globe,
	Zap,
	CheckCircle2,
	ArrowRight,
	Mail,
	Upload,
	X,
} from 'lucide-react';

import { countries } from '@/lib/countries';
import './careers.css';

const fadeUp: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { type: 'tween', duration: 0.6, ease: 'easeOut' },
	},
};

const staggerContainer: Variants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.08,
		},
	},
};

const cardVariants: Variants = {
	hidden: { opacity: 0, y: 28, scale: 0.96 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { type: 'tween', duration: 0.45, ease: 'easeOut' },
	},
};

interface FormData {
	fullName: string;
	email: string;
	phone: string;
	countryCode: string;
	position: string;
	description: string;
	cv: File | null;
}

const Careers = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		fullName: '',
		email: '',
		phone: '',
		countryCode: '+91',
		position: '',
		description: '',
		cv: null
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Create FormData object
		const data = new FormData();
		data.append('fullName', formData.fullName);
		data.append('email', formData.email);
		data.append('phone', formData.phone);
		data.append('countryCode', formData.countryCode);
		data.append('position', formData.position);
		data.append('description', formData.description);
		if (formData.cv) {
			data.append('cv', formData.cv);
		}

		try {
			const response = await fetch('/api/careers', {
				method: 'POST',
				body: data,
			});

			if (!response.ok) {
				throw new Error('Failed to submit application');
			}

			alert('Application submitted successfully!');
			// Reset form
			setFormData({
				fullName: '',
				email: '',
				phone: '',
				countryCode: '+91',
				position: '',
				description: '',
				cv: null
			});
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		} catch (error) {
			console.error('Error submitting application:', error);
			alert('There was an error submitting your application. Please try again.');
		}
	};

	const applyCv = (file: File | undefined) => {
		if (!file) return;
		setFormData((prev) => ({ ...prev, cv: file }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		applyCv(e.target.files?.[0]);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
		applyCv(e.dataTransfer.files?.[0]);
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (/^[a-zA-Z\s]*$/.test(value)) {
			setFormData({ ...formData, fullName: value });
		}
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (!/\s/.test(value)) {
			setFormData({ ...formData, email: value });
		}
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (/^\d*$/.test(value)) {
			setFormData({ ...formData, phone: value });
		}
	};

	const handleFileButtonClick = () => {
		fileInputRef.current?.click();
	};

	const clearCv = (e: React.MouseEvent) => {
		e.stopPropagation();
		setFormData((prev) => ({ ...prev, cv: null }));
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	return (
		<div className="min-h-screen bg-white">
			{/* <div className="min-h-screen bg-white font-sans text-gray-800"> */}
			<Navbar />

			{/* Hero Section */}
			<div className="relative w-full h-[40vh] bg-[#062516] flex items-center justify-center overflow-hidden">
				<div
					className="absolute inset-0 z-0 opacity-120"
					style={{
						// backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80")',
						backgroundImage: 'url("/assets/banners/Career.jpg")',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				/>
				{/* <div className="absolute inset-0 bg-gradient-to-b from-[#062516]/60 to-[#062516] z-0" /> */}

				<div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-up">
					{/* <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            CAREERS
          </h1> */}
					{/* <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto text-center">
            Build your future with a company committed to excellence, integrity, and sustainable growth.
          </p> */}
				</div>
			</div>

			{/* Introduction Section */}
			<section className="py-5 px-4 max-w-7xl mx-auto">
				<div className="text-center max-w-7xl mx-auto mb-16">
					<h3 className="section-title-spl text-center text-[#062516] mb-10">Careers</h3>
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeUp}
					>
						<p className="text-lg text-gray-600 leading-relaxed">
							At JIVO Energy, we are committed to building a highly skilled, diverse, and performance-driven workforce.
							As we broaden our portfolio and expand our presence across the region, we continue to seek professionals
							who demonstrate excellence, integrity, and a commitment to delivering results. If you aspire to be part
							of a reputable and future-focused organisation, we welcome you to explore career opportunities with us.
						</p>
					</motion.div>
				</div>

				{/* Why Work With Us */}
				<div className="grid md:grid-cols-2 gap-12 items-center mb-24">
					<motion.div
						className="space-y-8"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeUp}
					>
						<h3 className="section-title text-[#062516] text-center">
							Why Work With Us?
						</h3>
						<p className="text-gray-600 mb-6">
							Working with JIVO Energy means becoming part of a stable, growth-oriented company that values
							professionalism and long-term career development. We are committed to:
						</p>
						<ul className="space-y-4">
							{[
								"Fostering a supportive, inclusive, and collaborative work environment.",
								"Providing opportunities for continuous professional growth and skills development.",
								"Encouraging innovation, ownership, and creativity.",
								"Recognising and rewarding strong performance and dedication.",
								"Promoting work-life balance and offering a competitive compensation package."
							].map((item, index) => (
								<li key={index} className="flex items-start space-x-3 text-gray-600">
									<CheckCircle2 className="w-6 h-6 text-[#062516] flex-shrink-0 mt-0.5" />
									<span className="text-gray-600">{item}</span>
								</li>
							))}
						</ul>
					</motion.div>
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeUp}
					>
						<div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
							<div
								className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
								style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80")' }}
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-[#062516]/80 to-transparent" />
							<div className="absolute bottom-8 left-8 text-white">
								<p className="text-2xl font-bold">Growth & Stability</p>
								<p className="opacity-90">Building the future together</p>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Our Culture & Values */}
				<div className="mb-24 ">
					<h3 className="section-title text-center text-[#062516]">Our Culture & Values</h3>
					<motion.div
						className="grid md:grid-cols-3 lg:grid-cols-5 gap-6"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-80px' }}
						variants={staggerContainer}
					>
						{[
							{ icon: Shield, title: "Integrity", desc: "Doing what’s right, consistently and transparently." },
							{ icon: Users, title: "Collaboration", desc: "Working together to achieve shared goals." },
							{ icon: CheckCircle2, title: "Accountability", desc: "Taking ownership of our responsibilities and outcomes." },
							{ icon: TrendingUp, title: "Continuous Improvement", desc: "Embracing learning, growth, and innovation." },
							{ icon: Heart, title: "Customer-Focused", desc: "Placing our customers at the heart of everything we do." }
						].map((value, index) => (
							<motion.div
								key={index}
								variants={cardVariants}
								whileHover={{ y: -6, scale: 1.03, transition: { type: 'spring', stiffness: 320, damping: 22 } }}
								className="bg-[#F5FBF5] p-6 rounded-xl shadow-lg transition-shadow duration-300 group2"
							>
								<div className="w-12 h-12 bg-[#F5FBF5] rounded-full flex items-center justify-center mb-4 group2-hover:bg-[#062516] transition-colors duration-300">
									<value.icon className="w-6 h-6 text-[#062516] group-hover:text-white transition-colors duration-300" />
								</div>
								<h4 className="text-lg font-bold text-[#062516] mb-2 bg-[#F5FBF5]">{value.title}</h4>
								<p className="text-sm text-black bg-[#F5FBF5]">{value.desc}</p>
							</motion.div>
						))}
					</motion.div>
				</div>

				{/* Life at JIVO & Benefits */}
				<div className="grid md:grid-cols-2 gap-8 mb-24">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeUp}
					>
						<div className="bg-[#F5FBF5] text-white p-10 rounded-2xl relative overflow-hidden">
							<div className="relative z-10 text-[#062516]">
								<h3 className="section-title mb-6 flex items-center">
									<Globe className="mr-3" /> Life at JIVO Energy
								</h3>
								<ul className="space-y-4">
									{[
										"Collaborative culture",
										"Project-driven environment",
										"Safety-first philosophy",
										"Professional development focus",
										"Cross-country or multi-site exposure"
									].map((item, index) => (
										<li key={index} className="flex items-center space-x-3 opacity-90">
											<div className="w-1.5 h-1.5 bg-[#062516] rounded-full" />
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
							<div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#FFFA84]/10 rounded-full blur-3xl" />
						</div>
					</motion.div>

					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeUp}
					>
						<div className="bg-[#062516] text-white p-10 rounded-2xl relative overflow-hidden">
							<h3 className="section-title mb-6 flex items-center">
								<Award className="mr-3" /> Employee Benefits
							</h3>
							<ul className="space-y-4">
								{[
									"Health insurance / medical coverage",
									"Annual performance bonuses",
									"Training sponsorships (technical certifications, PMP, HSE, etc.)",
									"Travel opportunities for site or project work",
									"Team outings, learning sessions, mentorship programs"
								].map((item, index) => (
									<li key={index} className="flex items-start space-x-3 text-white">
										<div className="w-1.5 h-1.5 bg-[#ffffff] mt-2.5 rounded-full" />
										{/* <div className="w-5 h-5 text-[#ffffff] mt-0.5 flex-shrink-0" /> */}
										<span>{item}</span>
									</li>
								))}
							</ul>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Job Openings */}
			<section className="careers-jobs">
				<div className="careers-jobs__inner">
					<motion.div
						className="careers-jobs__head"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeUp}
					>
						<h3 className="section-title text-center text-[#062516]">Current Job Openings</h3>
						<p>
							Be part of a future-focused team where innovation, collaboration, and purpose come together to create exceptional work.
							Ready to take the next step in your career?
						</p>
					</motion.div>

					<motion.div
						className="careers-jobs__list"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-80px' }}
						variants={staggerContainer}
					>
						{[
							{
								title: "Technical Manager - Electrical",
								experience: "5 to 10 years",
								location: "Africa (travel required)",
								pdf: "/careers/Technical Manager JD for Careers Page.pdf"
							},
							// {
							//   title: "Logistics Manager",
							//   experience: "4 to 7 years",
							//   location: "Gurgaon, India (travel required)",
							//   pdf: "/careers/Logistics Manager JD for Careers Page.pdf"
							// },
							// {
							//   title: "HSES Manager",
							//   experience: "5 to 7 years",
							//   location: "Gurgaon, India (travel required)",
							//   pdf: "/careers/HSES Manager JD for Careers Page.pdf"
							// }
						].map((job, index) => (
							<motion.article
								key={index}
								variants={cardVariants}
								className="careers-job-card"
							>
								<span className="careers-job-card__accent" aria-hidden="true" />
								<div className="careers-job-card__body">
									<span className="careers-job-card__open">Open Position</span>
									<h4>{job.title}</h4>
									<div className="careers-job-card__meta">
										<div className="careers-job-card__meta-item">
											<span className="careers-job-card__meta-icon">
												<Briefcase className="w-4 h-4" />
											</span>
											<span>
												<span className="careers-job-card__meta-label">Experience</span>
												<span className="careers-job-card__meta-value">{job.experience}</span>
											</span>
										</div>
										<div className="careers-job-card__meta-item">
											<span className="careers-job-card__meta-icon">
												<Globe className="w-4 h-4" />
											</span>
											<span>
												<span className="careers-job-card__meta-label">Location</span>
												<span className="careers-job-card__meta-value">{job.location}</span>
											</span>
										</div>
									</div>
								</div>
								<a
									href={job.pdf}
									target="_blank"
									rel="noopener noreferrer"
									className="careers-job-card__cta"
								>
									View Details
									<ArrowRight className="w-4 h-4" />
								</a>
							</motion.article>
						))}
					</motion.div>

					<p className="careers-jobs__note">
						Don&apos;t see a suitable role? Send us your CV anyway – we&apos;re always open to great talent.
					</p>
				</div>
			</section>

			<section className="careers-apply">
				<div className="careers-apply__inner">
					<motion.div
						className="careers-apply__intro"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeUp}
					>
						<h3 className="careers-apply__title">
							Be Part of Our
							<span>Growth Story</span>
						</h3>
						<div className="careers-apply__rule" aria-hidden="true">
							<span />
							<i />
							<i />
						</div>
						<p>
							We are always looking for passionate, hardworking, and talented individuals who want to grow with us.
							Even if the role listed here doesn’t match your profile, feel free to send us CV. We’re always open to great talent!
						</p>
						<div className="careers-apply__email">
							<span className="careers-apply__email-label">Email us directly</span>
							<a href="mailto:info@jivoenergy.com" className="careers-apply__email-card">
								<span className="careers-apply__email-icon">
									<Mail className="w-5 h-5" />
								</span>
								<span>
									<strong>info@jivoenergy.com</strong>
									<em>We&apos;ll reach out within 48 hours.</em>
								</span>
							</a>
						</div>
					</motion.div>

					<motion.div
						className="careers-apply__form-wrap"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeUp}
					>
						<form onSubmit={handleSubmit} className="careers-apply__form">
							<div className="careers-apply__form-head">
								<h4>Submit Your Application</h4>
							</div>

							<div className="careers-apply__row careers-apply__row--2">
								<div className="careers-apply__field">
									<label htmlFor="fullName">Full Name</label>
									<input
										type="text"
										id="fullName"
										placeholder="John Doe"
										required
										value={formData.fullName}
										onChange={handleNameChange}
									/>
								</div>
								<div className="careers-apply__field">
									<label htmlFor="email">Email Address</label>
									<input
										type="email"
										id="email"
										placeholder="john@example.com"
										required
										value={formData.email}
										onChange={handleEmailChange}
									/>
								</div>
							</div>

							<div className="careers-apply__field">
								<label htmlFor="phone">Phone Number</label>
								<div className="careers-apply__phone">
									<select
										aria-label="Country code"
										value={formData.countryCode}
										onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
									>
										{countries.map((country) => (
											<option key={`${country.code}-${country.dial_code}`} value={country.dial_code}>
												{country.code} ({country.dial_code})
											</option>
										))}
									</select>
									<input
										type="tel"
										id="phone"
										placeholder="Enter phone number"
										required
										value={formData.phone}
										onChange={handlePhoneChange}
									/>
								</div>
							</div>

							<div className="careers-apply__field">
								<label htmlFor="position">Position Applied For</label>
								<input
									type="text"
									id="position"
									placeholder="e.g. Project Manager"
									required
									value={formData.position}
									onChange={(e) => setFormData({ ...formData, position: e.target.value })}
								/>
							</div>

							<div className="careers-apply__field">
								<label htmlFor="description">Brief Profile Description</label>
								<textarea
									id="description"
									rows={3}
									placeholder="Tell us a bit about yourself and why you'd be a great fit..."
									required
									value={formData.description}
									onChange={(e) => setFormData({ ...formData, description: e.target.value })}
								/>
							</div>

							<div className="careers-apply__field careers-apply__field--cv">
								<div className="careers-apply__cv-label">
									<label htmlFor="cv">Attach CV</label>
									<span>PDF, DOC, DOCX · Max 5MB</span>
								</div>
								<div
									className={`careers-apply__dropzone${isDragging ? ' is-dragging' : ''}${formData.cv ? ' has-file' : ''}`}
									onClick={handleFileButtonClick}
									onDragOver={(e) => {
										e.preventDefault();
										setIsDragging(true);
									}}
									onDragLeave={() => setIsDragging(false)}
									onDrop={handleDrop}
									role="button"
									tabIndex={0}
									onKeyDown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											e.preventDefault();
											handleFileButtonClick();
										}
									}}
								>
									<input
										type="file"
										id="cv"
										ref={fileInputRef}
										accept=".pdf,.doc,.docx"
										className="hidden"
										onChange={handleFileChange}
									/>
									<span className="careers-apply__drop-icon">
										<Upload className="w-4 h-4" />
									</span>
									<span className="careers-apply__drop-title">
										{formData.cv ? formData.cv.name : 'Upload file or drag and drop'}
									</span>
									{formData.cv && (
										<button
											type="button"
											className="careers-apply__drop-clear"
											aria-label="Remove CV"
											onClick={clearCv}
										>
											<X className="w-3.5 h-3.5" />
										</button>
									)}
								</div>
							</div>

							<button type="submit" className="careers-apply__submit">
								Submit Application
								<ArrowRight className="w-4 h-4" />
							</button>

							<p className="careers-apply__secure">
								<Shield className="w-3.5 h-3.5" />
								Your information is kept confidential and secure.
							</p>
						</form>
					</motion.div>
				</div>
			</section>

			<Footer />
			{/* </div> */}
		</div>
	);
};

export default Careers;
