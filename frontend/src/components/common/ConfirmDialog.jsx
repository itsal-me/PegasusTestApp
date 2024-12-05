import { motion } from "framer-motion";

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 bg-dark/80 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-dark-light/50 backdrop-blur-xl rounded-2xl border border-primary-500/10 p-6 w-full max-w-md relative"
            >
                <h2 className="text-xl font-semibold text-white mb-4">
                    Confirm Action
                </h2>
                <p className="text-gray-400 mb-6">{message}</p>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white bg-gray-500/10 hover:bg-gray-500/20 rounded-lg transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors duration-200"
                    >
                        Delete
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
