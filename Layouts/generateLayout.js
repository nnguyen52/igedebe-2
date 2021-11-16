import EmptyLayout from './emptyLayout';
import ProtectedLayout from './protectedLayout';
export const renderLayout = (page, layoutType) => {
  return GenerateLayout(page, layoutType);
};
const GenerateLayout = (page, layoutType) => {
  if (layoutType === 'protected') return <ProtectedLayout>{page}</ProtectedLayout>;
  return <EmptyLayout>{page}</EmptyLayout>;
};
export default GenerateLayout;
