import { Beef } from 'lucide-react';
import { ComponentProps } from 'react';

export default function ApplicationLogo(props: ComponentProps<typeof Beef>) {
    return <Beef {...props} aria-label="Logo Pternak" />;
}
