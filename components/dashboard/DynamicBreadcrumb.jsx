'use client'
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';


export default function DynamicBreadcrumb() {
  const path = usePathname()
 

  const pathParts = path.split('/').filter((part) => part);

  const breadcrumbs = pathParts.map((part, index) => {
    const href = '/' + pathParts.slice(0, index + 1).join('/');
    const label = part.charAt(0).toUpperCase() + part.slice(1);
    return { href, label };
  });

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <Fragment key={crumb.href}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={crumb.href}>{crumb.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index != (breadcrumbs.length - 1) && (
              <BreadcrumbSeparator />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
