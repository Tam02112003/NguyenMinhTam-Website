import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cột 1: Giới thiệu */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Về chúng tôi</h3>
          {/* <p className="text-sm">
            Chúng tôi cung cấp các sản phẩm chất lượng cao với dịch vụ khách hàng tận tâm.
          </p> */}
        </div>

        {/* Cột 2: Liên kết */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Liên kết nhanh</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Trang chủ</a></li>
          
          </ul>
        </div>

        {/* Cột 3: Thông tin liên hệ */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Liên hệ</h3>
          <p className="text-sm">Email: ngminhtam021103@gmail.com</p>

     
        </div>
      </div>

      {/* Dòng bản quyền */}
      <div className="mt-8 text-center text-sm text-gray-400 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} NMT Portfolio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
