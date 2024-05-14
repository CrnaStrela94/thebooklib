import React from 'react';
import Buttons from './btn';
import { Author } from 'next/dist/lib/metadata/types/metadata-types';



interface AuthorInfoModalProps {
    authorInfo: any;
    onClose: () => void;
    author: Author;

}

export const AuthorInfoModal: React.FC<AuthorInfoModalProps> = ({ authorInfo, onClose }) => {
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle xs:w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-xl leading-6 font-medium text-gray-900" id="modal-title">
                                    {authorInfo ? authorInfo.name : 'Loading...'}
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-700">
                                        <strong>Birth date:</strong> {authorInfo.birth_date}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        <strong>Work count:</strong> {authorInfo.work_count}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        <strong>Top work:</strong> {authorInfo.top_work}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        <strong>Alternate names:</strong> {authorInfo.alternate_names ? authorInfo.alternate_names.join(', ') : 'N/A'}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        <strong>Top subjects:</strong> {authorInfo.top_subjects ? authorInfo.top_subjects.join(', ') : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <Buttons text={'Close'} type={'button'} onClick={onClose} />
                    </div>
                </div>
            </div>
        </div>
    );
};