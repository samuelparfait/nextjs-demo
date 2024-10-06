'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/components/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import type { Post } from '@/lib/types';

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title must be at least 2 characters.' })
    .max(55),
  content: z
    .string()
    .min(2, { message: 'Content must be at least 2 characters.' }),
});

export type FormData = z.infer<typeof formSchema>;

export function CreatePostForm({
  action,
}: {
  action: (
    formData: FormData
  ) => Promise<{ message: string; data: Post; status: boolean }>;
}) {
  const { toast } = useToast();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await action(data);

    toast({
      title: response.status ? 'Success' : 'Error',
      description: response.message,
      action: <ToastAction altText='Dismiss'>Dismiss</ToastAction>,
      variant: response.status ? 'default' : 'destructive',
    });

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full flex flex-col gap-4 my-4'
    >
      <div className='space-y-2 flex flex-col'>
        <label htmlFor='title' className='font-semibold'>
          Title
        </label>
        <input
          {...register('title')}
          id='title'
          placeholder='Enter the blog post title'
          maxLength={55}
          className='p-3 border rounded-md outline-2 outline-slate-800'
        />
        {errors.title && (
          <p role='alert' className='text-red-500 py-2'>
            {errors.title.message}
          </p>
        )}
      </div>

      <div className='space-y-2 flex flex-col'>
        <label htmlFor='content' className='font-semibold'>
          Content
        </label>
        <textarea
          {...register('content')}
          id='content'
          placeholder='Write your blog post content here'
          className='p-3 border rounded-md outline-2 outline-slate-800'
          rows={5}
        />
        {errors.content && (
          <p role='alert' className='text-red-500 py-2'>
            {errors.content.message}
          </p>
        )}
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full bg-slate-800 hover:bg-slate-950 text-white p-3 rounded-md'
      >
        {isSubmitting ? 'Submitting...' : 'Create Post'}
      </button>
    </form>
  );
}
