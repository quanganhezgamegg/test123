import React from 'react';
import Link from 'next/link';
const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">
            <header className="bg-blue-600 text-white py-6">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold">Về chúng tôi</h1>
                    <p className="mt-2 text-lg">Khám phá nhiều hơn về nhiệm vụ và giá trị</p>
                </div>
            </header>
            <main className="container mx-auto py-10 px-4">
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Nhiệm vụ của chúng tôi</h2>
                    <p className="text-gray-700 leading-relaxed">
                        
                        Ở Joodoo, sứ mệnh của chúng tôi là cung cấp những trải nghiệm du lịch không thể nào quên bằng cách kết nối bạn với những điểm đến, tour du lịch và chỗ ở tốt nhất. Chúng tôi mong muốn truyền cảm hứng và trao quyền cho những người yêu thích du lịch khám phá thế giới một cách tự tin và dễ dàng.
                    </p>
                </section>
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Giá trị của chúng tôi</h2>
                    <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                        <li>Customer Satisfaction: We prioritize your happiness and satisfaction above all else.</li>
                        <li>Quality: We ensure that every service we provide meets the highest standards.</li>
                        <li>Safety: Your safety is our top priority, and we take every measure to ensure it.</li>
                        <li>Respect: We respect the cultures and traditions of the places we visit.</li>
                        <li>Community: We believe in giving back to the communities we visit and supporting local economies.</li>
                        <li>Empowerment: We empower our customers with the knowledge and tools they need to travel confidently.</li>
                        <li>Collaboration: We work closely with local partners to provide you with authentic experiences.</li>
                        <li>Responsibility: We take responsibility for our actions and their impact on the environment.</li>
                        <li>Trust: We build trust with our customers through transparency and reliability.</li>
                        <li>Passion: We are passionate about travel and sharing that passion with you.</li>
                        <li>Adventure: We encourage you to step out of your comfort zone and embrace new experiences.</li>
                        <li>Integrity: We operate with honesty and transparency in everything we do.</li>
                        <li>Innovation: We continuously improve and innovate to enhance your travel experience.</li>
                        <li>Sustainability: We are committed to promoting eco-friendly and sustainable tourism.</li>
                    </ul>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Tại sao nên chọn chúng tôi</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Chúng tôi không chỉ là một công ty du lịch, mà là một cộng đồng những người yêu thích khám phá. Chúng tôi hiểu rằng mỗi chuyến đi đều là một câu chuyện, và chúng tôi muốn giúp bạn viết nên câu chuyện của riêng mình. Từ việc lên kế hoạch cho hành trình đến việc cung cấp dịch vụ hỗ trợ tận tình, chúng tôi cam kết mang đến cho bạn trải nghiệm du lịch tốt nhất.
                        Với nhiều năm kinh nghiệm trong ngành du lịch, một đội ngũ chuyên gia du lịch tận tâm và niềm đam mê khám phá, chúng tôi là đối tác đáng tin cậy của bạn trong việc tạo ra những hành trình đáng nhớ. Hãy để chúng tôi giúp bạn lên kế hoạch cho cuộc phiêu lưu tiếp theo của bạn!
                    </p>
                </section>
            </main>
           
        </div>
    );
};
export default AboutPage;
