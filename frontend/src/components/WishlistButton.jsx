import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postData } from '../api';
import heartIcon from '../assets/heart.svg';
import heartIconRed from '../assets/heartfill.svg';

export default function WishlistButton({ item, type }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => postData('students/wishlist', data),
    onSuccess: () => {
      if (type === 'competition') {
        queryClient.invalidateQueries(['competitions']);
      } else if (type === 'event') {
        queryClient.invalidateQueries(['events']);
      } else if (type === 'webinar') {
        queryClient.invalidateQueries(['webinars']);
      }
    },
    onError: (error) => {
      alert(`Error ${item.isWishlist === 1 ? 'removing' : 'adding'} ${type} to wishlist: ${error.message}`);
      console.log(`Error ${item.isWishlist === 1 ? 'removing' : 'adding'} ${type} to wishlist: ${error.message}`);
    }
  });

  const handleToggleWishlist = () => {
    if (item.isWishlist === 1) {
      mutation.mutate({ id: item.id, type: type, remove: true });
    } else {
      mutation.mutate({ id: item.id, type: type, remove: false });
    }
  };

  return (
    <button
      className="text-grey hover:text-white"
      onClick={handleToggleWishlist}
    >
      {item.isWishlist === 1 ? (
        <img src={heartIconRed} alt="Remove from wishlist" className="w-6 h-6" />
      ) : (
        <img src={heartIcon} alt="Add to wishlist" className="w-6 h-6" />
      )}
    </button>
  );
}
