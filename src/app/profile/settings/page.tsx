import ChangePasswordForm from '@/app/_components/profile/ChangePasswordForm';
import ProfileInfoForm from '@/app/_components/profile/profileInfoForm';

export default function page() {
  
  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
          <p className="text-gray-500 text-sm mt-1">Update your profile information and change your password</p>
        </div>
        <ProfileInfoForm />
        <ChangePasswordForm/>
      </div>
    </>
  )
}
