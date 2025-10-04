-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_role_id ON user_roles(role_id);
CREATE INDEX idx_user_metadata_user_id ON user_metadata(user_id);
CREATE INDEX idx_user_metadata_key ON user_metadata(key);
CREATE INDEX idx_user_metadata_namespace ON user_metadata(namespace);
CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_token ON user_sessions(token_hash);
CREATE INDEX idx_user_sessions_expires ON user_sessions(expires_at);
CREATE INDEX idx_user_audit_user_id ON user_audit_log(user_id);
CREATE INDEX idx_user_audit_action ON user_audit_log(action);

-- write all the indexes here